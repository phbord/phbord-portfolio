import { TrophyIcon } from '@heroicons/react/20/solid';
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
  year_start?: number;
  year_end?: number;
  title_fr?: string;
  title_en?: string;
  duration?: string;
  picto?: string;
  school?: string;
  is_important?: boolean;
  projects?: DataListItemListTrainingsInterface;
}

interface DataListItemListTrainingsInterface {
  project?: string;
  url?: string;
}


export default function ItemListTrainings({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListTrainingsInterface) {
  return (
    <>
      {
        data
          ? (
            <li className='trainings'>
              {/* Bloc GAUCHE */}
              <div className={data.is_important ? 'trainings-date font-800' : 'trainings-date font-light'}>
                {data.year_start}
                {data.year_end && `-${String(data.year_end).slice(2)}`}
              </div>

              {/* Bloc DROIT */}
              <div className='flex justify-between flex-grow'>
                {/* Détails */}
                <div>
                  {/* Titre */}
                  <div className={data.is_important ? 'trainings-title font-900' : 'trainings-title font-light'}>
                    <span>{lang === 'fr' ? data.title_fr : data.title_en}</span>
                    {
                      data.duration && (
                        <span className='ml-1 text-sm'> - {data.duration}</span>
                      )
                    }
                    {
                      data.is_important && (
                        <TrophyIcon className='h-4 ml-2 text-yellow-400' />
                      )
                    }
                  </div>
                  {/* Ecole + Durée */}
                  <figure className='flex items-center text-cyan-900'>
                    {
                      data.school && (
                        <figcaption className='mr-2 uppercase'>
                          {data.school}
                        </figcaption>
                      )
                    }
                    {
                      data.picto && (
                        <img src={`/images/icons/${data.picto}`} alt={''} className='h-6' />
                      )
                    }
                  </figure>
                  {/* Liste des projets */}
                  <div className='trainings-body'>
                    <ul>
                      {
                        data && data?.projects && data?.projects?.map((item?: DataListItemListTrainingsInterface) => (
                          <li key={uuidv4()} 
                              className='my-[.375rem] flex items-stretch'>
                            <figure className='flex flex-col flex-nowrap items-center justify-end'>
                              <figcaption className='text-cyan-900'>
                                <div>
                                  {item.project}
                                </div>
                                <div>
                                  {
                                    item.url && (
                                      <Link to={item.url} className='trainings-link'>
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
                <FormButtonGroup onEditClick={onEditClick}
                                  onDeleteClick={onDeleteClick}
                                  idEdit={idEdit}
                                  idDelete={idDelete} />
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
