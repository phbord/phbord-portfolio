import type { JSXElementConstructor, ReactElement, ReactNode, ReactPortal} from 'react';
import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
import type { To } from 'react-router';


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
        <ul>
          {
            data?.map((item: { href: To; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined; }) => (
              <li key={uuidv4()}>
                <Link to={item.href}>{item.name}</Link>
              </li>
            ))
          }
        </ul>
      </nav>
    </>
  )
}
