import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from "~/components/ui/Button";
import Tooltip from './Tooltip';


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
            <li className='mb-4 px-4 py-2 flex justify-between flex-col sm:flex-row border border-dotted bg-neutral-100'>
              <div className="text-neutral-600">
                {lang === 'fr' ? data.title_fr : data.title_en}
              </div>
              <ul className='flex ml-2'>
                {
                  data?.list?.map((item, index) => (
                    <li key={uuidv4()} className=''>
                      {/* BUTTON */}
                      <Button className='group relative overflow-visible transition-all' 
                              onMouseOver={() => onMouseOver(index, item.name)} 
                              onMouseOut={() => onMouseOut(index)}>
                        {/* IMAGE */}
                        <img src={`/images/svg/${item.picto}`} 
                              alt={item.name} 
                              className='h-5 ml-2 my[.5rem]' />
                        {/* TOOLTIP */}
                        {
                          newIndex === index 
                            && <Tooltip name={newName} className='tooltips-knowledges' />
                        }
                      </Button>
                      {/* BUTTON : end */}
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
