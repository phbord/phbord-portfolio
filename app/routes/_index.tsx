import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useActionData, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import getData from "~/services/getData";
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import ItemListKnowledges from "~/components/core/ItemListKnowledges";
import Modal from "~/components/core/Modal";
import BackgroundImageHeader from "~/components/core/background-image/BackgroundImageHeader";
import Button from "~/components/core/buttons/Button";
import { useState } from "react";


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
  const fetcher = useFetcher();
  const [idItem, setIdItem] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  console.log('data --->', data);

  // CREATION d'un nouvel élément
  const onNewClick = (): void => {
    navigate(`/knowledges/create`);
  };

  // EDITION d'un nouvel élément
  const onEditClick = (id: number): number => {
    navigate(`/knowledges/${id}/edit`);
    return id;
  };

  // SUPPRESSION d'un nouvel élément
  const onDeleteClick = (id: number) => {
    console.log('=== onDeleteClick ===', id);
    setModalOpened(true);
    setIdItem(id);
    return id;
  };

  // Ouverture de la MODAL
  const onOpenedModalClick = (id: number): void => {
    setModalOpened(true);
    setIdItem(id);
  };

  // Fermeture de la MODAL
  const onCancelModalClick = (): void => {
    setModalOpened(false);
    setIdItem(null);
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
            data?.map((knowledge: any, index: number) => (
              <ItemListKnowledges key={uuidv4()} 
                                  data={knowledge} 
                                  noData={t('noDataText')} 
                                  lang={newLang}
                                  idEdit={`btn-admin-edit-${index}`}
                                  idDelete={`btn-admin-delete-${index}`}
                                  onEditClick={() => onEditClick(index)}
                                  onDeleteClick={() => onOpenedModalClick(knowledge?.id)} />
            ))
          }
        </ul>
      </section>

      {/* M O D A L */}
      {
        modalOpened && (
          <Modal onDeleteItemClick={() => onDeleteClick(idItem)} 
                  onCancelModalClick={onCancelModalClick}
                  buttonValue={t('buttonDeleteText')}>
            <div className='flex'>
              <TrashIcon className='modal-icon' />
              <div className='modal-'>
                <h3 className='modal-title'>
                  {t('modalDeleteRowTitleText')}
                </h3>
                <p className='modal-desc'>
                  {t('modalDeleteRowText')}
                </p>
              </div>
            </div>
          </Modal>
        )
      }
    </>
  );
}