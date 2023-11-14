import { Link } from '@remix-run/react';
import { useState } from 'react';


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
  title: string;
  subtitle: string;
  description: string;
  url: string;
}


export default function ItemListLinks({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListLinksInterface) {
  return (
    <li className='links-item'>
      <Link to={data.url} className='link'>
        <article>
          {
            data?.picto && (
              <figure className='link-figure'>
                <img src={`/images/icons/${data.picto}`} 
                      alt={data.title} 
                      className='link-img' />
                <figcaption className='sr-only'>
                  {data.title}
                </figcaption>
              </figure>
            )
          }
          <h3 className='h3 text-center'>
            {data.title}
          </h3>
          <p className='link-subtitle'>
            {data.subtitle}
          </p>
          <p className='link-description multilines-truncate-3'>
            {data.description}
          </p>
          <p className='link-url truncate'>
            {data.url}
          </p>
        </article>
      </Link>
    </li>
  )
}
