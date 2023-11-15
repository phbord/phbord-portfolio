import { CloudArrowDownIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';


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
  diploma: string;
  title: string;
  school?: string;
  file: string;
  picto?: string;
  is_important?: boolean;
}


export default function ItemListDownloads({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListDownloadsInterface) {
  return (
    <li className='downloads-item'>
      <Link to={data.file} className='download'>
        <article className='download-article'>
          {/* HAUT : Année */}
          <time dateTime={data.year} className='download-year'>
            {data.year}
          </time>

          {/* MILLIEU */}
          <div>
            {/* Dipplôme */}
            <h3 className='h3 uppercase'>
              {data.diploma}
            </h3>
            {/* Titre */}
            <p className='download-title'>
              {data.title}
            </p>
            {/* School */}
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

          {/* BAS : Icône */}
          <p className='download-icon-group'>
            <CloudArrowDownIcon className='download-icon' />
          </p>
        </article>
      </Link>
    </li>
  )
}
