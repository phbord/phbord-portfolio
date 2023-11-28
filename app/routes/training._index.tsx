import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import { json, type MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';

import metaGlobal from '~/assets/data/MetaFunctionGlobal';
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import Button from '~/components/core/buttons/Button';
import ItemListTrainings from '~/components/pages/ItemListTrainings';
import Modal from '~/components/core/Modal';
import SnackBar from '~/components/core/SnackBar';
import Tooltip from '~/components/core/Tooltip';
import Filters from '~/components/core/Filters';
import { useHandleFilterClick } from '~/hooks/useHandleFilterClick';


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleTrainingsIndex },
    { property:"og:title", content: metaGlobal.titleTrainingsIndex },
  ];
};

export async function loader() {
  const options: object = { table: 'Trainings', orderBy: 'year_start', orderByBis: 'year_end' };
  const trainings = await getData(options);
  
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
  const [isNewTooltipOpened, setIsNewTooltipOpened] = useState(false);
  const [trainingsData, setTrainingsData] = useState(trainings);

  const handleFilterClick = (e): void => {
    const { onIsImportantClick } = useHandleFilterClick(trainings, e.target.id);
    setTrainingsData(() => onIsImportantClick());
  };

  const handleNewMouseOver = () => setIsNewTooltipOpened(true);
  const handleNewMouseOut = () => setIsNewTooltipOpened(false);

  // CREATION d'un nouvel élément
  const onNewClick = (): void => {
    navigate(`/training/create`);
  };

  // EDITION d'un nouvel élément
  const onEditClick = (id: number): number => {
    navigate(`/training/${id}/edit`);
    return id;
  };

  // SUPPRESSION d'un nouvel élément
  const onDeleteClick = (id: number) => {
    //console.log('=== onDeleteClick ===', id);
    setModalOpened(true);
    setIdItem(id);
    // Suppression de la ligne
    fetcher.submit(
      { table: 'Trainings', id },
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
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-old-city.jpeg' 
                              titleClass='bg-img-header-h2' 
                              keywordsClass='mr-2' />

      {/* BODY */}
      <section className="container-custom mt-[13rem] sm:mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.2.name', { returnObjects: true })}
          </h2>
          {/* Boutons */}
          <div className='flex'>
            {/* NOMBRE d'éléments */}
            <span className='items-count'>
              {trainingsData.length}
            </span>
            {/* FILTRES */}
            <Filters onClick={handleFilterClick} 
                      textFilter={t('longTrainingText')} 
                      textFilterInverse={t('shortTrainingText')} />
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
        </div>
           
        {/* L I S T E */}
        <ul>
          {
            trainingsData?.map((training: any, index: number) => (
              <ItemListTrainings key={uuidv4()} 
                                  data={training} 
                                  noData={t('noDataText')} 
                                  lang={newLang}
                                  idEdit={`btn-admin-edit-${index}`}
                                  idDelete={`btn-admin-delete-${index}`}
                                  onEditClick={() => onEditClick(index)}
                                  onDeleteClick={() => onOpenedModalClick(training?.id)} />
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
