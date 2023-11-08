import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import { json } from '@remix-run/node';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon } from '@heroicons/react/20/solid';

import metaGlobal from '~/assets/data/MetaFunctionGlobal';
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import Button from '~/components/core/buttons/Button';
import ItemListTrainings from '~/components/core/ItemListTrainings';


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Trainings', orderBy: 'year_start', orderByBis: 'year_end' };
  const trainings = await getData(options);
  console.log('+++++++++++++', trainings);
  
  return json(await {
    trainings,
  });
}


export default function Training() {
  const { trainings } = useLoaderData<typeof loader>();
  const dataAction = useActionData();
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const { isSession }: any = useSession();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [idItem, setIdItem] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const revalidator = useRevalidator();
  console.log('trainings --->', trainings);


  useEffect(() => {}, [])


  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-old-city.jpeg' 
                              titleClass='mb-1 text-[1.35rem] text-yellow-200' 
                              keywordsClass='mr-2' />

      {/* BODY */}
      <section className="container-custom mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.2.name', { returnObjects: true })}
          </h2>
        </div>
           
        {/* L I S T E */}
        <ul>
          {
            trainings?.map((training: any, index: number) => (
              <ItemListTrainings key={uuidv4()} 
                                  data={training} 
                                  noData={t('noDataText')} 
                                  lang={newLang}
                                  idEdit={`btn-admin-edit-${index}`}
                                  idDelete={`btn-admin-delete-${index}`}
                                  onEditClick={() => 'onEditClick(index)'}
                                  onDeleteClick={() => 'onOpenedModalClick(knowledge?.id)'} />
            ))
          }
        </ul>
      </section>
    </>
  )
}
