import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { LoaderFunctionArgs, json } from '@remix-run/node';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
import { getSession } from '~/services/auth';
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const response = new Response();
  const session = await getSession();
  console.log('LOADER ----> sessionData:', session, ' / headers:', response.headers);
  return json(
    { session },
    { headers: response.headers }
  );
}

export default function Sidebar({mainData, authData}: SidebarInterface) {
  const session = useLoaderData<typeof loader>();
  console.log('Sidebar > sessionData:', session);
  const { t } = useTranslation();
  const data = useActionData();
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');
  const navigate = useNavigate();

  const handleClickMenu = () => useSidebarStore.getState().setSideBarOpened();


  useEffect(() => {
    console.log('useEffect )))session:', session);
    
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
