import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tooltip from '~/components/ui/Tooltip';
import Button from '~/components/ui/Button';


export default function ItemListKnowledges({data, noData, lang}) {
  return (
    <>
      {
        data
          ? (
            <li className='mb-6'>
              <h3 className='h3'>
                {lang === 'fr' ? data.title_fr : data.title_en}
              </h3>
              <ul className='flex flex-wrap border-t border-dotted border-orange-500'>
                {
                  data?.list?.map((item) => (
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
            <li className=''>{noData}</li>
          )
      }
    </>
  )
}
