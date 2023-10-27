import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
import { getCookie, isSbSession, removeCookie } from '~/services/cookies';
import ItemListLayout from '~/components/layout/ItemListLayout';
import Button from '~/components/core/buttons/Button';
import SnackBar from '~/components/core/SnackBar';


interface SidebarInterface {
  mainData: ItemSidebarInterface;
  authData: ItemSidebarInterface;
}
interface ItemSidebarInterface {
  name: string;
  href: string;
}


export default function Sidebar({mainData, authData}: SidebarInterface) {
  const data = useActionData();
  const { t } = useTranslation();
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');
  const [isSignoutClick, setIsSignoutClick] = useState(false);
  const [displayedSnackBar, setDisplayedSnackBar] = useState(false);
  const [isSession, setIsSession] = useState(false);
  const navigate = useNavigate();

  const handleClickMenu = () => useSidebarStore.getState().setSideBarOpened();

  const handleClickSignOut = async () => {
    handleClickMenu();
    setIsSignoutClick(!isSignoutClick);
    //removeCookie('sb_session');
  };


  useEffect(() => {
    setIsSession(() => isSbSession());
  }, [])

  useEffect(() => {
    /* data?.isDisplayedSnackBar && setTimeout(() => {
      navigate(data?.redirectionPath);
    }, 3000); */
    //console.log('isSignoutClick -------->', isSignoutClick);
    setIsSession(() => isSbSession());
  }, [isSignoutClick])

  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
    setIsSession(() => isSbSession());
  }, [isSideBarOpened])

  useEffect(() => {
    setIsSession(() => isSbSession());

    if (data?.isDisplayedSnackBar) {
      setDisplayedSnackBar(data?.isDisplayedSnackBar);
      setTimeout(() => {
        setDisplayedSnackBar(false);
      }, 3000);
    }
  }, [data])


  return (
    <>
      <nav className={`sidebar ${toggleClass}`}>
        {/* Menu PRINCIPAL */}
        <ul className='flex flex-col'>
          {
            mainData?.map((item: ItemSidebarInterface) => (
              <ItemListLayout key={uuidv4()} 
                              data={item} 
                              linkClass='sidebar-link'
                              onClick={handleClickMenu} />
            ))
          }
        </ul>

        {/* Menu SECONDAIRE */}
        <ul className='mt-5 flex flex-col'>
          {
            isSession
              ? (
                <>
                  {/* Bouton de DECONNEXION */}
                  <li>
                    <Form method="post">
                      <Button type='submit'
                              className='sidebar-link w-full flex'
                              onClick={handleClickSignOut}>
                        {authData[1]?.name}
                      </Button>
                    </Form>
                  </li>
                </>
              )
              : (
                <>
                  {/* Bouton de CONNEXION */}
                  <ItemListLayout data={authData[0]} 
                                  linkClass='sidebar-link'
                                  onClick={handleClickMenu} />
                </>
              )
          }
        </ul>
      </nav>

      {/* SNACKBAR */}
      <>
        {
          displayedSnackBar
            && (
              <SnackBar isSuccess modalClass="snackbar-slide-in">
                {t(data?.message)}
              </SnackBar>
            )
        }
      </>
    </>
  )
}
