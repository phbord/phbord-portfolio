import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

import { getData } from "~/services/getData";
import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, useState, useEffect } from "react";
import BackgroundImageHeader from "~/components/ui/BackgroundImageHeader";
import ItemListKnowledges from "~/components/ui/ItemListKnowledges";


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
  const title = t('header.0.name', { returnObjects: true });
  const noData = t('noDataText');
  const [lang, setLang] = useState('');
  console.log('data --->', data);

  useEffect(() => {
    setLang(localStorage.getItem('lang'));
  }, [])

  useEffect(() => {
    setLang(localStorage.getItem('lang'));
  }, [lang])

  return (
    <>
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-map.jpg' />
      <section className="container-custom mt-[5rem]">
        <h1>{lang}</h1>
        <h2 className="h2">{title}</h2>
        <ul>
          {
            data?.map((knowledge: any) => (
              <ItemListKnowledges key={uuidv4()} data={knowledge} noData={noData} lang={lang} />
            ))
          }
        </ul>
      </section>
    </>
  );
}