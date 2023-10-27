import { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tooltip from '~/components/core/Tooltip';
import Button from '~/components/core/buttons/Button';
import FormButtonGroup from './form/FormButtonGroup';


interface ItemListKnowledgesInterface {
  data: DataItemListKnowledgesInterface;
  noData?: string;
  lang: string;
}

interface DataItemListKnowledgesInterface {
  title_fr?: string;
  title_en?: string;
  list?: DataListItemListKnowledgesInterface;
}

interface DataListItemListKnowledgesInterface {
  picto?: string;
  name?: string;
}

export default function ItemListKnowledges({data, noData, lang}: ItemListKnowledgesInterface) {
  return (
    <>
      {
        data
          ? (
            <li className='mb-6'>
              <div className='flex justify-between mb-1'>
                <h3 className='h3 mr-3'>
                  {lang === 'fr' ? data.title_fr : data.title_en}
                </h3>
                <FormButtonGroup />
              </div>
              <ul className='flex flex-wrap border-t border-orange-500'>
                {
                  data?.list?.map((item: {picto: string; name: string}) => (
                    <li key={uuidv4()} 
                        className='mx-3 my-[.375rem] flex items-stretch'>
                      <figure className='flex flex-col flex-nowrap items-center justify-end'>
                        <img src={`/images/svg/${item.picto}`} 
                                alt={item.name} 
                                className='max-w-[1.5rem] mb-1' />
                        <figcaption className='text-cyan-900'>{item.name}</figcaption>
                      </figure>
                    </li>
                  ))
                }
              </ul>
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
