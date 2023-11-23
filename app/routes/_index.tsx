import { json, type MetaFunction } from "@remix-run/node";
import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon, TrashIcon } from "@heroicons/react/20/solid";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import getData from "~/services/getData";
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import ItemListKnowledges from "~/components/pages/ItemListKnowledges";
import Modal from "~/components/core/Modal";
import BackgroundImageHeader from "~/components/core/background-image/BackgroundImageHeader";
import Button from "~/components/core/buttons/Button";
import SnackBar from "~/components/core/SnackBar";
import Tooltip from "~/components/core/Tooltip";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleKnowledgesIndex },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const knowledges = await getData(options);
  return json(await {
    knowledges,
  });
}


export default function Index() {
  const { knowledges } = useLoaderData<typeof loader>();
  const dataAction = useActionData();
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const { isSession }: any = useSession();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [idItem, setIdItem] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const revalidator = useRevalidator();
  const [isNewTooltipOpened, setIsNewTooltipOpened] = useState(false);
  //console.log('knowledges --->', knowledges);

  const handleNewMouseOver = () => setIsNewTooltipOpened(true);
  const handleNewMouseOut = () => setIsNewTooltipOpened(false);

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
    setModalOpened(true);
    setIdItem(id);
    // Suppression de la ligne
    fetcher.submit(
      { table: 'Knowledges', id },
      { method: 'post', action: '/api/delete' }
    );
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


  useEffect(() => {
    dataAction?.isValid === true && revalidator.revalidate();
  }, [revalidator])


  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-map.jpg' 
                              titleClass='bg-img-header-h2' 
                              keywordsClass='mr-2' />
      
      {/* BODY */}
      <section className="container-custom mt-[13rem] sm:mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.0.name', { returnObjects: true })} <span className='text-xs'>({knowledges.length})</span>
          </h2>
          {/* Bouton de CREATION */}
          {
            isSession && (
              <Button className='relative btn-admin-form btn-admin-form--new mt-12'
                      srOnlyText={`${t('buttonText')} ${t('buttonNewText')}`}
                      onClick={onNewClick}
                      onMouseOver={handleNewMouseOver}
                      onMouseOut={handleNewMouseOut}>
                <PlusIcon className='h-5' />
                {/* TOOLTIPS */}
                {
                  isNewTooltipOpened && (
                    <Tooltip name={t('buttonNewText')} 
                              className='tooltips-footer' />
                  )
                }
              </Button>
            )
          }
        </div>

        {/* L I S T E */}
        <ul>
          {
            knowledges?.map((knowledge: any, index: number) => (
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
              <div>
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

      {/* S N A C K B A R */}
      {
        dataAction?.isDisplayedSnackBar
          ? dataAction?.isValid
            ? (
              <SnackBar isSuccess modalClass="snackbar-slide-in">
                {t(dataAction?.message)}
              </SnackBar>
            )
            : (
              <SnackBar isError modalClass="snackbar-slide-in">
                {t(dataAction?.message)}
              </SnackBar>
            )
          : ''
      }
    </>
  );
}