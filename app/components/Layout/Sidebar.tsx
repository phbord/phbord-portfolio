import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';


export default function Sidebar({data}) {
  const openedClass = 'right-0';
  const { isSideBarOpened } = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');

  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
  }, [isSideBarOpened])

  return (
    <>
      <nav className={`sidebar ${toggleClass}`}>
        <ul>
          {
            data?.map((item) => (
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
