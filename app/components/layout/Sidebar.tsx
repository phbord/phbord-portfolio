import type { JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from 'react';
import { useEffect, useState } from 'react';
import type { To } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
import ItemListLayout from '~/components/layout/ItemListLayout';


export default function Sidebar({mainData, authData}: any) {
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');


  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
  }, [isSideBarOpened])


  return (
    <>
      <nav className={`sidebar ${toggleClass}`}>
        {/* Menu PRINCIPAL */}
        <ul className='flex flex-col'>
          {
            mainData?.map((item: { href: To; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; }) => (
              <>
                <ItemListLayout key={uuidv4()} 
                                data={item} 
                                linkClass='sidebar-link' />
              </>
            ))
          }
        </ul>

        {/* Menu SECONDAIRE */}
        <ul className='mt-5 flex flex-col'>
          {
            authData?.map((item: { href: To; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; }) => (
              <>
                <ItemListLayout key={uuidv4()} 
                                data={item} 
                                linkClass='sidebar-link' />
              </>
            ))
          }
        </ul>
      </nav>
    </>
  )
}
