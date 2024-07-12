import { TrophyIcon } from '@heroicons/react/20/solid';
import { Link } from '@remix-run/react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';
import Button from '~/components/core/buttons/Button'
import ButtonToggleItem from '~/components/core/buttons/ButtonToggleItem';


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
  firm_fr: string;
  firm_en: string;
  description_fr?: string;
  description_en?: string;
  stack?: string;
  esn_fr?: string;
  esn_en?: string;
  list_fr?: Array<string>;
  list_en?: Array<string>;
  position_fr?: string;
  position_en?: string;
  position_code?: string;
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
  const experiencesDateStyle = {
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden'
  };

  const handleClick = () => {
    isItemOpened ? setIsItemOpened(false) : setIsItemOpened(true);
  };


  return (
    <>
      {
        data
          ? (
            <li className={data.is_important ? 'experiences experiences--important' : 'experiences'}>
              {/* H E A D E R */}
              <div className='experiences-head'>
                {/* Bloc  G A U C H E */}
                <Button className='experiences-info' 
                        onClick={handleClick}>
                  <span className='experiences-head-row-1'>
                    {/* Dates */}
                    <span className='experiences-date' style={experiencesDateStyle}>
                      {monthStart}{yearStart}{monthYearUnion}{monthEnd}{yearEnd}
                    </span>
                    {/* Entreprise */}
                    <strong className='experiences-firm'>
                      <span>
                        {lang === 'fr' ? data.firm_fr : data.firm_en}
                      </span>
                      <span>
                        {
                          data.picto && (<img src={`/images/icons/${data.picto}`} 
                                              alt={lang === 'fr' ? data.firm_fr : data.firm_en} 
                                              className='icon-experiences-firm' />)
                        }
                      </span>
                    </strong>
                  </span>
                  {/* ESN et POSTE */}
                  {
                    (data?.esn_fr || data?.esn_en || data?.position_fr || data?.position_en) && (
                      <span className='experiences-head-row-2'>
                        <span>{lang === 'fr' ? `${data?.esn_fr} ` : `${data?.esn_en} `}</span>
                        <span>{data?.esn_fr && data?.esn_en && data?.position_fr && data?.position_en ? ', ' : ''}</span>
                        <span>{lang === 'fr' ? data?.position_fr : data?.position_en}</span>
                      </span>
                    )
                  }
                </Button>
                {/* Bloc  D R O I T */}
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
                  {lang === 'fr' ? data?.description_fr : data?.description_en}
                </p>
                <ul className='experiences-list'>
                  {
                    lang === 'fr'
                      ? data?.list_fr && data?.list_fr?.map((item) => (
                          <li key={uuidv4()}>{item}</li>
                        ))
                      : data?.list_en && data?.list_en?.map((item) => (
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
