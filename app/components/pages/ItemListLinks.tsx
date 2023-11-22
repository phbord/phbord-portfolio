import { SparklesIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';


interface ItemListLinksInterface {
  data: DataItemListLinksInterface;
  noData?: string;
  lang: string;
  idEdit: string;
  idDelete: string;
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface DataItemListLinksInterface {
  order?: number;
  is_important?: boolean;
  picto?: string;
  title_fr: string;
  title_en: string;
  subtitle: string;
  description_fr: string;
  description_en: string;
  url: string;
}


export default function ItemListLinks({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListLinksInterface) {
  const title = lang === 'fr' ? data.title_fr : data.title_en;

  return (
    <>
      {
        data 
          ? (
            <li className={data.is_important ? 'links-item links-item--important' : 'links-item'}>
              <Link to={data.url} target='_blank' className={data.is_important ? 'link link--important' : 'link'}>
                <article>
                  {/* Logo */}
                  {
                    data?.picto && (
                      <figure className='link-figure'>
                        <img src={`/images/icons/${data.picto}`} 
                              alt={title}
                              className='link-img' />
                        <figcaption className='sr-only'>
                          {title}
                        </figcaption>
                      </figure>
                    )
                  }
                  {/* Titre */}
                  <h3 className={data.is_important ? 'h3 text-center leading-5 font-semibold' : 'h3 text-center leading-5'}>
                    {title}
                  </h3>
                  {/* Sous-titre */}
                  <p className='link-subtitle'>
                    <span>
                      {data.subtitle}
                    </span>
                    {
                      data.is_important && (
                        <SparklesIcon className='link-important-icon' />
                      )
                    }
                  </p>
                  {/* Description */}
                  <p className='link-description multilines-truncate-3'>
                    {lang === 'fr' ? data.description_fr : data.description_en}
                  </p>
                  {/* Url */}
                  <p className='link-url truncate'>
                    {data.url}
                  </p>
                </article>
              </Link>

              {/* B O U T O N S  d'édition et de suppression */}
              <FormButtonGroup onEditClick={onEditClick}
                                onDeleteClick={onDeleteClick}
                                idEdit={idEdit}
                                idDelete={idDelete}
                                className='btn-admin-form-group--bottom' />
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
