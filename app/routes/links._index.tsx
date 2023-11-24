import { useActionData, useFetcher, useLoaderData, useNavigate, useRevalidator } from '@remix-run/react';
import { json, type MetaFunction } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { PlusIcon, TrashIcon } from '@heroicons/react/20/solid';

import metaGlobal from '~/assets/data/MetaFunctionGlobal';
import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import Button from '~/components/core/buttons/Button';
import ItemListLinks from '~/components/pages/ItemListLinks';
import Modal from '~/components/core/Modal';
import SnackBar from '~/components/core/SnackBar';
import Tooltip from '~/components/core/Tooltip';
import Filters from '~/components/core/Filters';
import { useHandleFilterClick } from '~/hooks/useHandleFilterClick';


export const meta: MetaFunction = () => {
  return [
    { title: `${metaGlobal.titleLinksIndex}` },
    { name: "description", content: metaGlobal.description },
    { robots: metaGlobal.robots },
    { keywords: metaGlobal.keywords },
    { author: metaGlobal.author },
    { property:"og:title", content: metaGlobal.titleLinksIndex },
    { property:"og:type", content: metaGlobal.ogType },
    { property:"og:description", content: metaGlobal.description },
    { property:"og:url", content: metaGlobal.ogUrl },
    { property:"og:image", content: metaGlobal.ogImage },
  ];
};

export async function loader() {
  const options: object = { table: 'Links', orderBy: 'order' };
  const links = await getData(options);
  
  return json(await {
    links,
  });
}


export default function Links() {
  const { links } = useLoaderData<typeof loader>();
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
  const [linksData, setLinksData] = useState(links);

  const handleFilterClick = (e): void => {
    const { onIsImportantClick } = useHandleFilterClick(links, e.target.id);
    setLinksData(() => onIsImportantClick());
  };

  const handleNewMouseOver = () => setIsNewTooltipOpened(true);
  const handleNewMouseOut = () => setIsNewTooltipOpened(false);

  // CREATION d'un nouvel élément
  const onNewClick = (): void => {
    navigate(`/links/create`);
  };

  // EDITION d'un nouvel élément
  const onEditClick = (id: number): number => {
    navigate(`/links/${id}/edit`);
    return id;
  };

  // SUPPRESSION d'un nouvel élément
  const onDeleteClick = (id: number) => {
    setModalOpened(true);
    setIdItem(id);
    // Suppression de la ligne
    fetcher.submit(
      { table: 'Links', id },
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
    //setLinksData(handleFilterClick());
  }, [])

  useEffect(() => {
    dataAction?.isValid === true && revalidator.revalidate();
  }, [revalidator])


  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-rails.jpeg' 
                              titleClass='bg-img-header-h2' 
                              keywordsClass='mr-2' />

      {/* BODY */}
      <section className="container-custom mt-[13rem] sm:mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.3.name', { returnObjects: true })}
          </h2>
          {/* Boutons */}
          <div className='flex'>
            {/* NOMBRE d'éléments */}
            <span className='items-count'>
              {linksData.length}
            </span>
            {/* FILTRES */}
            <Filters onClick={handleFilterClick} 
                      textFilter={t('majorProjectText')} 
                      textFilterInverse={t('minorProjectText')} />
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
        <div>
            <ul className='links'>
              {
                linksData?.map((link: any, index: number) => (
                  <ItemListLinks key={uuidv4()} 
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
