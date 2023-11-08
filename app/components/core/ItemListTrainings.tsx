import { LinkIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';


interface ItemListTrainingsInterface {
  data: DataItemListTrainingsInterface;
  noData?: string;
  lang: string;
  idEdit: string;
  idDelete: string;
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface DataItemListTrainingsInterface {
  title_fr?: string;
  title_en?: string;
  list?: DataListItemListTrainingsInterface;
}

interface DataListItemListTrainingsInterface {
  picto?: string;
  name?: string;
}

interface ProjectsItemListTrainingsInterface {
  project: string,
  url: string
}


export default function ItemListTrainings({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListTrainingsInterface) {
  return (
    <>
      {
        data
          ? (
            <li className='trainings'>
              {/* Bloc GAUCHE */}
              <div className='trainings-date'>
                {data.year_start}
                {data.year_end && `-${String(data.year_end).slice(2)}`}
              </div>
              {/* Bloc DROIT */}
              <div className='flex'>
                {/* Détails */}
                <div>
                  {/* Titre */}
                  <div className='text-lg'>
                    {lang === 'fr' ? data.title_fr : data.title_en}
                  </div>
                  {/* Ecole + Durée */}
                  {data.school && (
                    <figure className='flex items-center text-cyan-900'>
                      <figcaption className='mr-2 uppercase'>{data.school}</figcaption>
                      <img src={`/images/icons/${data.picto}`}
                            alt={''}
                            className='h-6' />
                    </figure>
                  )}
                  {/* Liste des projets */}
                  <div className='trainings-body'>
                    <ul>
                      {
                        data?.projects?.map((item?: ProjectsItemListTrainingsInterface) => (
                          <li key={uuidv4()} 
                              className='my-[.375rem] flex items-stretch'>
                            <figure className='flex flex-col flex-nowrap items-center justify-end'>
                              <figcaption className='text-cyan-900'>
                                <div className=''>
                                  {item.project}
                                </div>
                                <div className=''>
                                  {
                                    item.url && (
                                      <Link to={item.url} className='trainings-link'>
                                        <LinkIcon className='h-3 mr-1' />
                                        {item.url}
                                      </Link>
                                    )
                                  }
                                </div>
                              </figcaption>
                            </figure>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                {/* GROUPE de boutons */}
              </div>
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
