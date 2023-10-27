import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useActionData, useNavigate } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/20/solid";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { getData } from "~/services/getData";
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import ItemListKnowledges from "~/components/core/ItemListKnowledges";
import BackgroundImageHeader from "~/components/core/background-image/BackgroundImageHeader";
import Button from "~/components/core/buttons/Button";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};

/* export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  console.log(formData, '************** formData:', formData.get("id"));
  
  return json({});
} */

export async function loader() {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const data = await getData(options);
  return json(await data);
}


export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const { isSession }: any = useSession();
  const navigate = useNavigate();
  console.log('data --->', data);

  const onNewClick = () => {
    console.log('=== onNewClick ===');
  };

  const onEditClick = (id: number) => {
    console.log('=== onEditClick ===', id);
    navigate(`/knowledges/${id}/edit`);
    return id;
  };

  const onDeleteClick = (id: number) => {
    console.log('=== onDeleteClick ===', id);
    return id;
  };


  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-map.jpg' 
                              titleClass='mb-1 text-[1.35rem] text-yellow-200' 
                              keywordsClass='mr-2' />
      
      {/* BODY */}
      <section className="container-custom mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.0.name', { returnObjects: true })}
          </h2>
          {/* Bouton de CREATION */}
          {
            isSession && (
              <Button className='btn-admin-form btn-admin-form--new mt-12'
                      srOnlyText={`${t('buttonText')} ${t('buttonNewText')}`}
                      onClick={onNewClick} >
                <PlusIcon className='h-5' />
              </Button>
            )
          }
        </div>

        {/* L I S T E */}
        <ul>
          {
            data?.map((knowledge: any) => (
              <ItemListKnowledges key={uuidv4()} 
                                  data={knowledge} 
                                  noData={t('noDataText')} 
                                  lang={newLang}
                                  idEdit={`btn-admin-edit-${knowledge?.id}`}
                                  idDelete={`btn-admin-delete-${knowledge?.id}`}
                                  onEditClick={() => onEditClick(knowledge?.id)}
                                  onDeleteClick={() => onDeleteClick(knowledge?.id)} />
            ))
          }
        </ul>
      </section>
    </>
  );
}