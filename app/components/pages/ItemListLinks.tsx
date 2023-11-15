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
            <li className='links-item'>
              <Link to={data.url} className='link'>
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
                  <h3 className='h3 text-center'>
                    {title}
                  </h3>
                  {/* Sous-titre */}
                  <p className='link-subtitle'>
                    {data.subtitle}
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
                                className='justify-center mt-2 mr-1' />
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
