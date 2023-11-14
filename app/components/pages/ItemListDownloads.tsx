import { CloudArrowDownIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';


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
  is_important?: boolean;
}


export default function ItemListDownloads({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListDownloadsInterface) {
  const [newIcon, setNewIcon] = useState(null);
  const [isShowSchool, setIsShowSchool] = useState(true);

  const displayIcon = (icon) => {
    switch (icon.toLowerCase()) {
      case 'greta 92':
        setNewIcon('picto-greta.png');
        setIsShowSchool(false);
        break;
      case 'the hacking project':
        setNewIcon('picto-thp.jpg');
        setIsShowSchool(false);
        break;
      case 'udemy':
        setNewIcon('picto-udemy.png');
        break;
      case 'openclassroom':
        setNewIcon('picto-oc.png');
        break;
      case 'iiis':
        setNewIcon('picto-iiis.jpg');
        break;
      case 'sqli institut':
        setNewIcon('picto-sqli.png');
        break;
      case 'afpa':
        setNewIcon('picto-afpa.svg');
        break;
      default:
        break;
    }
  };


  useEffect(() => {
    displayIcon(data.school);
  }, [])


  return (
    <li className='downloads-item'>
      <Link to={data.file} className='download'>
        <article className='download-article'>
          <time dateTime={data.year} className='download-year'>
            {data.year}
          </time>
          <div>
            <h3 className='h3 uppercase'>
              {data.diploma}
            </h3>
            <p className='download-title'>
              {data.title}
            </p>
            <figure className='download-school'>
              {
                newIcon && (
                  <img src={`/images/icons/${newIcon}`} 
                        alt={data.school} 
                        className='download-school-icon' />
                )
              }
              {
                isShowSchool && (
                  <figcaption className='download-school-figcaption'>
                    {data.school}
                  </figcaption>
                )
              }
            </figure>
            <p className='download-icon-group'>
              <CloudArrowDownIcon className='download-icon' />
            </p>
          </div>
        </article>
      </Link>
    </li>
  )
}
