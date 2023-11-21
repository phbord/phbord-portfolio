import { Link } from '@remix-run/react';
import { CloudArrowDownIcon, CloudIcon, SparklesIcon } from '@heroicons/react/20/solid';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';


interface ItemListDownloadsInterface {
  data: DataItemListDownloadsInterface;
  noData?: string;
  lang: string;
  idEdit: string;
  idDelete: string;
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface DataItemListDownloadsInterface {
  order: number;
  year: number;
  diploma_fr: string;
  diploma_en: string;
  title_fr: string;
  title_en: string;
  school?: string;
  file: string;
  picto?: string;
  is_important?: boolean;
}


export default function ItemListDownloads({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListDownloadsInterface) {
  const contentBlock = (
    <>
      {
        data.is_important && (
          <SparklesIcon className='download-important-icon' />
        )
      }

      <article className='download-article'>
        {/* H A U T : Année */}
        <time dateTime={data.year} className='download-year'>
          {data.year}
        </time>

        {/* M I L I E U */}
        <div>
          {/* Dipplôme */}
          <h3 className='h3 uppercase'>
            {lang === 'fr' ? data.diploma_fr : data.diploma_en}
          </h3>
          {/* Titre */}
          <p className='download-title'>
            {lang === 'fr' ? data.title_fr : data.title_en}
          </p>
          {/* Etablissement */}
          <figure className='download-school'>
            {
              data.picto && (
                <img src={`/images/icons/${data.picto}`} 
                      alt={data.school ? data.school : data.picto} 
                      className='download-school-icon' />
              )
            }
            {
              data.school && (
                <figcaption className='download-school-figcaption'>
                  {data.school}
                </figcaption>
              )
            }
          </figure>
        </div>

        {/* B A S : Icône */}
        <p className='download-icon-group'>
          {
            data.file
              ? (<CloudArrowDownIcon className='download-icon text-orange-500' />)
              : (<CloudIcon className='download-icon text-gray-200' />)
          }
        </p>
      </article>
    </>
  );


  return (
    <>
      {
        data
          ? (
            <li className={data.is_important ? 'downloads-item downloads-item--important' : 'downloads-item'}>
              {
                data.file
                  ? (
                    <Link to={data.file} 
                          target='_blank' 
                          className={data.is_important ? 'download download--link' : 'download'}>
                      {contentBlock}
                    </Link>
                  )
                  : (
                    <div className='download'>
                      {contentBlock}
                    </div>
                  )
              }

              {/* B O U T O N S  d'édition et de suppression */}
              <FormButtonGroup onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}
                                idEdit={idEdit}
                                idDelete={idDelete}
                                className='relative btn-admin-form-group--bottom' />
            </li>
          )
          : (
            <li>
              {noData}
            </li>
          )
      }
    </>
  )
}
