import { TrophyIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';
import Button from '~/components/core/buttons/Button'
import ButtonToggleItem from '../core/buttons/ButtonToggleItem';


interface ItemListExperiencesInterface {
  data: DataItemListExperiencesInterface;
  noData?: string;
  lang: string;
  idEdit: string;
  idDelete: string;
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

interface DataItemListExperiencesInterface {
  year_start?: number;
  year_end?: number;
  month_start?: number;
  month_end?: number;
  picto?: string;
  firm: string;
  description?: string;
  stack?: string;
  esn?: string;
  list?: Array<string>;
}


export default function ItemListExperiences({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListExperiencesInterface) {
  const monthStart = data.month_start 
    ? data.month_start < 10
      ? `0${data.month_start}/`
      : `${data.month_start}/`
    : '';
  const monthEnd = data.month_end 
    ? data.month_end < 10
      ? `0${data.month_end}/`
      : `${data.month_end}/`
    : '';
  const yearStart = data.year_start && data.year_start;
  const yearEnd = data.year_end && data.year_end;
  const monthYearUnion = data.year_end && '-';
  const isPicto: boolean = data?.picto ? true : false;
  const [isItemOpened, setIsItemOpened] = useState(false);

  const handleClick = () => {
    isItemOpened ? setIsItemOpened(false) : setIsItemOpened(true);
  };


  return (
    <>
      {
        data
          ? (
            <li className='experiences'>
              {/* H E A D E R */}
              <div className='experiences-head'>
                {/* Bloc GAUCHE */}
                <Button className='experiences-info' 
                        onClick={handleClick}>
                  <div className='experiences-head-row-1'>
                    {/* Dates */}
                    <div className='experiences-date'>
                      {monthStart}{yearStart}{monthYearUnion}{monthEnd}{yearEnd}
                    </div>
                    {/* Entreprise */}
                    <strong className='experiences-firm'>
                      {data.firm}
                    </strong>
                    {/* Picto */}
                    {
                      (isPicto) && (
                        <img src={`/images/icons/${data.picto}`} 
                              alt={data.firm} 
                              className='experiences-picto' />
                      )
                    }
                  </div>
                  {
                    data?.esn && (
                      <div className='experiences-head-row-2'>
                        {data?.esn}
                      </div>
                    )
                  }
                </Button>
                {/* Bloc DROIT */}
                <div className='experiences-btn-group'>
                  {/* Boutons d'édition et de suppression */}
                  <FormButtonGroup onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                    idEdit={idEdit}
                                    idDelete={idDelete} />
                  {/* Bouton d'ouverture/fermeture du bloc */}
                  <ButtonToggleItem isItemOpened={isItemOpened} 
                                    onClick={handleClick} />
                </div>
              </div>

              {/* B O D Y */}
              <div className={isItemOpened ? 'experiences-body experiences-body--opened' : 'experiences-body'}>
                <p className='experiences-descripton'>
                  {data?.description}
                </p>
                <ul className='experiences-list'>
                  {
                    data?.list && data?.list?.map((item) => (
                      <li key={uuidv4()}>{item}</li>
                    ))
                  }
                </ul>
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
