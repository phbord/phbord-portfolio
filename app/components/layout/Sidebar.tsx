import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData, useNavigate } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
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
  const { t } = useTranslation();
  const data = useActionData();
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');
  const navigate = useNavigate();

  const handleClickMenu = () => useSidebarStore.getState().setSideBarOpened();


  useEffect(() => {
    data?.isDisplayedSnackBar && setTimeout(() => {
      navigate(data?.redirectionPath);
    }, 3000);
  }, [data])

  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
  }, [isSideBarOpened])


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
          <ItemListLayout data={authData[0]} 
                          linkClass='sidebar-link'
                          onClick={handleClickMenu} />
          <li>
            <Form method='post'>
              <Button type='submit'
                      className='sidebar-link w-full flex'
                      onClick={handleClickMenu}>
                {authData[1]?.name}
              </Button>
            </Form>
          </li>
        </ul>
      </nav>

      {/* SNACKBAR */}
      <>
        {
          data?.isDisplayedSnackBar
            ? data?.isValid
              ? (
                <SnackBar isSuccess modalClass="snackbar-slide-in">
                  {t(data?.message)}
                </SnackBar>
              )
              : (
                <SnackBar isError modalClass="snackbar-slide-in">
                  {t(data?.message)}
                </SnackBar>
              )
            : ''
        }
      </>
    </>
  )
}
