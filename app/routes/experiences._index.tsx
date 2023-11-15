import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import { json } from '@remix-run/node';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';

import metaGlobal from '~/assets/data/MetaFunctionGlobal';
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import Button from '~/components/core/buttons/Button';
import ItemListExperiences from '~/components/pages/ItemListExperiences';
import Modal from '~/components/core/Modal';
import SnackBar from '~/components/core/SnackBar';
import Tooltip from '~/components/core/Tooltip';


export const meta: MetaFunction = () => {
  return [
    { title: `${metaGlobal.title} - Expériences` },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Experiences', orderBy: 'year_start', orderByBis: 'month_start' };
  const experiences = await getData(options);
  
  return json(await {
    experiences,
  });
}


export default function Experiences() {
  const { experiences } = useLoaderData<typeof loader>();
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
    navigate(`/experiences/create`);
  };

  // EDITION d'un nouvel élément
  const onEditClick = (id: number): number => {
    navigate(`/experiences/${id}/edit`);
    return id;
  };

  // SUPPRESSION d'un nouvel élément
  const onDeleteClick = (id: number) => {
    setModalOpened(true);
    setIdItem(id);
    // Suppression de la ligne
    fetcher.submit(
      { table: 'Experiences', id },
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
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-modern-town.jpeg' 
                              titleClass='bg-img-header-h2' 
                              keywordsClass='mr-2' />

      {/* BODY */}
      <section className="container-custom mt-[13rem] sm:mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.1.name', { returnObjects: true })}
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
            experiences?.map((experience: any, index: number) => (
              <ItemListExperiences key={uuidv4()} 
                                  data={experience} 
                                  noData={t('noDataText')} 
                                  lang={newLang}
                                  idEdit={`btn-admin-edit-${index}`}
                                  idDelete={`btn-admin-delete-${index}`}
                                  onEditClick={() => onEditClick(experience?.id)}
                                  onDeleteClick={() => onOpenedModalClick(experience?.id)} />
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
  )
}
