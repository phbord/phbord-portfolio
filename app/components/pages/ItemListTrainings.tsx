import { Link } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';
import { SparklesIcon } from '@heroicons/react/20/solid';

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
  duration_fr?: string;
  duration_en?: string;
  picto?: string;
  school?: string;
  is_important?: boolean;
  projects_fr?: DataListItemListTrainingsInterface;
  projects_en?: DataListItemListTrainingsInterface;
}

interface DataListItemListTrainingsInterface {
  project?: string;
  url?: string;
}


export default function ItemListTrainings({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListTrainingsInterface) {
  const isPicto: boolean = data?.picto ? true : false;

  
  return (
    <>
      {
        data
          ? (
            <li className={data.is_important ? 'trainings trainings--important' : 'trainings'}>
              {/* Bloc GAUCHE */}
              <div className={data.is_important ? 'trainings-date font-800' : 'trainings-date font-light'}>
                {data.year_start}
                {data.year_end && `-${String(data.year_end).slice(2)}`}
              </div>

              {/* Bloc DROIT */}
              <div className='trainings-info'>
                {/* Détails */}
                <div className='trainings-details'>
                  {/* Titre */}
                  <div className='trainings-title'>
                    <span className={data.is_important ? 'font-900 font-semibold' : ''}>{lang === 'fr' ? data.title_fr : data.title_en}</span>
                    {
                      (data.duration_fr || data.duration_en) && (
                        <span className='trainings-duration'> - {lang === 'fr' ? data.duration_fr : data.duration_en}</span>
                      )
                    }
                    {
                      data.is_important && (
                        <SparklesIcon className='h-7 ml-2 text-yellow-400' />
                      )
                    }
                  </div>
                  {/* Ecole + Durée */}
                  <figure className='trainings-school-duration'>
                    {
                      data.school && (
                        <figcaption className='mr-2 uppercase'>
                          {data.school}
                        </figcaption>
                      )
                    }
                    {
                      (isPicto) && (
                        <img src={`/images/icons/${data.picto}`} 
                              alt={lang === 'fr' ? data.title_fr : data.title_en} 
                              className='h-6' />
                      )
                    }
                  </figure>
                  {/* Liste des projets */}
                  <div className='trainings-body'>
                    <ul>
                      {
                        lang === 'fr'
                          ? (data && data?.projects_fr) && data?.projects_fr?.map((item?: DataListItemListTrainingsInterface) => (
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
                          : (data && data?.projects_en) && data?.projects_en?.map((item?: DataListItemListTrainingsInterface) => (
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
                <div className='flex justify-end'>
                  <FormButtonGroup onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                    idEdit={idEdit}
                                    idDelete={idDelete} />
                </div>
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
