import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tooltip from '~/components/ui/Tooltip';
import Button from '~/components/ui/Button';


export default function ItemListKnowledges({data, noData, lang}) {
  const [newIndex, setNewIndex] = useState(-1);
  const [newName, setNewName] = useState('');

  const onMouseOver = (index: number, name: string) => {
    setNewIndex(index);
    setNewName(name);
  };

  const onMouseOut = (index: number) => {
    setNewIndex(-1);
    setNewName('');
  };

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
              
              {/* <div className="text-neutral-600">
                {lang === 'fr' ? data.title_fr : data.title_en}
              </div>
              <ul className='flex ml-2'>
                {
                  data?.list?.map((item, index) => (
                    <li key={uuidv4()} className=''>
                      <Button className='group relative overflow-visible transition-all' 
                              onMouseOver={() => onMouseOver(index, item.name)} 
                              onMouseOut={() => onMouseOut(index)}>
                        <img src={`/images/svg/${item.picto}`} 
                              alt={item.name} 
                              className='h-5 ml-2 my[.5rem]' />
                        {
                          newIndex === index 
                            && <Tooltip name={newName} className='tooltips-knowledges' />
                        }
                      </Button>
                    </li>
                  ))
                }
              </ul> */}
            </li>
          )
          : (
            <li className=''>{noData}</li>
          )
      }
    </>
  )
}
