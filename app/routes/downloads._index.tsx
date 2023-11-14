import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import { json } from '@remix-run/node';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';

import metaGlobal from '~/assets/data/MetaFunctionGlobal';
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import Button from '~/components/core/buttons/Button';
import ItemListDownloads from '~/components/pages/ItemListDownloads';
import Modal from '~/components/core/Modal';
import SnackBar from '~/components/core/SnackBar';
import Tooltip from '~/components/core/Tooltip';


export const meta: MetaFunction = () => {
  return [
    { title: `${metaGlobal.title} - Téléchargements` },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Downloads', orderBy: 'year', orderByBis: 'order' };
  const downloads = await getData(options);
  
  return json(await {
    downloads,
  });
}


export default function Downloads() {
  const { downloads } = useLoaderData<typeof loader>();
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

  const handleNewMouseOver = () => setIsNewTooltipOpened(true);
  const handleNewMouseOut = () => setIsNewTooltipOpened(false);

  // CREATION d'un nouvel élément
  const onNewClick = (): void => {
    navigate(`/downloads/create`);
  };

  // EDITION d'un nouvel élément
  const onEditClick = (id: number): number => {
    navigate(`/downloads/${id}/edit`);
    return id;
  };

  // SUPPRESSION d'un nouvel élément
  const onDeleteClick = (id: number) => {
    setModalOpened(true);
    setIdItem(id);
    // Suppression de la ligne
    fetcher.submit(
      { table: 'Downloads', id },
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
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-astroman.jpeg' 
                              titleClass='bg-img-header-h2' 
                              keywordsClass='mr-2' />

      {/* BODY */}
      <section className="container-custom mt-[13rem] sm:mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.4.name', { returnObjects: true })}
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
        <div>
            <ul className='downloads'>
              {
                downloads?.map((link: any, index: number) => (
                  <ItemListDownloads key={uuidv4()} 
                                      data={link} 
                                      noData={t('noDataText')} 
                                      lang={newLang}
                                      idEdit={`btn-admin-edit-${index}`}
                                      idDelete={`btn-admin-delete-${index}`}
                                      onEditClick={() => onEditClick(link?.id)}
                                      onDeleteClick={() => onOpenedModalClick(link?.id)} />
                ))
              }
            </ul>
        </div>
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
  )
}
