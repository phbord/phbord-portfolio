import { v4 as uuidv4 } from 'uuid';

import FormButtonGroup from '~/components/core/form/FormButtonGroup';


interface ItemListKnowledgesInterface {
  data: DataItemListKnowledgesInterface;
  noData?: string;
  lang: string;
  idEdit: string;
  idDelete: string;
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
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

export default function ItemListKnowledges({data, noData, lang, idEdit, idDelete, onEditClick, onDeleteClick}: ItemListKnowledgesInterface) {
  return (
    <>
      {
        data
          ? (
            <li className='mb-6'>
              {/* H E A D E R */}
              <div className='flex justify-between mb-1'>
                {/* TITRE */}
                <h3 className='h3 mr-3'>
                  {lang === 'fr' ? data.title_fr : data.title_en}
                </h3>
                {/* GROUPE de boutons */}
                <FormButtonGroup onEditClick={onEditClick}
                                  onDeleteClick={onDeleteClick}
                                  idEdit={idEdit}
                                  idDelete={idDelete} />
              </div>

              {/* L I S T E */}
              <ul className='flex flex-wrap border-t border-orange-500'>
                {
                  data && data?.list && data?.list?.map((item: {picto: string; name: string; fav: boolean}) => (
                    <li key={uuidv4()} 
                        className='mx-3 my-[.375rem] flex items-stretch'>
                      <figure className='flex flex-col flex-nowrap items-center justify-end'>
                        {
                          item.picto !== undefined && (
                            <img src={`/images/svg/${item.picto}`} 
                                  alt={item.name} 
                                  className='max-w-[1.5rem] mb-1' />
                          )
                        }
                        <figcaption className='text-cyan-900'>
                          <span className={item?.fav && 'favorite'}>
                            {item.name}
                          </span>
                        </figcaption>
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
