import { v4 as uuidv4 } from 'uuid';

import Button from "~/components/ui/Button";


export default function ItemListKnowledges({data, noData, lang}) {
  return (
    <>
      {
        data
          ? (
            <li className='flex justify-between border border-dotted border-orange-500 mb-4 px-4 py-2'>
              <div className="text-orange-500">
                {lang === 'fr' ? data.title_fr : data.title_en}
              </div>
              <ul className='flex ml-2'>
                {
                  data?.list?.map((item) => (
                    <li key={uuidv4()} className=''>
                      <Button className=''>
                        <img src={`/images/svg/${item.picto}`} 
                              alt={item.name} 
                              className='h-5 ml-2 my[.5rem]' />
                      </Button>
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
