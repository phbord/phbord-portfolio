import type { JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from 'react';
import { useEffect, useState } from 'react';
import type { To } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import ItemListLayout from '~/components/Layout/ItemListLayout';
import useSidebarStore from '~/services/store/useSidebarStore';


export default function Sidebar({data}: any) {
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');

  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
  }, [isSideBarOpened])

  return (
    <>
      <nav className={`sidebar ${toggleClass}`}>
        <ul className='flex flex-col'>
          {
            data?.map((item: { href: To; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; }) => (
              <ItemListLayout key={uuidv4()} 
                              data={item} 
                              linkClass='sidebar-link' />
            ))
          }
        </ul>
      </nav>
    </>
  )
}
