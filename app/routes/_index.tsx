import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { getData } from "~/services/getData";
import useLangStore from '~/services/store/useLangStore';
import ItemListKnowledges from "~/components/ui/ItemListKnowledges";
import BackgroundImageHeader from "~/components/ui/BackgroundImageHeader";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const data = await getData(options);
  return json(await data);
}


export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  console.log('data --->', data);

  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-map.jpg' />
      
      {/* BODY */}
      <section className="container-custom mt-[18.5rem] bg-neutral-200">
        <h2 className="h2">
          {t('header.0.name', { returnObjects: true })}
        </h2>
        <ul>
          {
            data?.map((knowledge: any) => (
              <ItemListKnowledges key={uuidv4()} 
                                  data={knowledge} 
                                  noData={t('noDataText')} 
                                  lang={newLang} />
            ))
          }
        </ul>
      </section>
    </>
  );
}