import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useActionData, useFetcher, useLoaderData, useRevalidator } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';

import useSidebarStore from '~/services/store/useSidebarStore';
import useSession from '~/services/store/useSession';
import { useHandleClickMenu } from '~/hooks/useHandleClickMenu';
import ItemListLayout from '~/components/layout/ItemListLayout';
import Button from '~/components/core/buttons/Button';
import SnackBar from '~/components/core/SnackBar';
import { UserCircleIcon } from '@heroicons/react/20/solid';


interface SidebarInterface {
  mainData: ItemSidebarInterface;
  authData: ItemSidebarInterface;
}
interface ItemSidebarInterface {
  name: string;
  href: string;
}


export default function Sidebar({mainData, authData}: SidebarInterface) {
  const { profilesData } = useLoaderData<typeof loader>();
  const data = useActionData();
  const { t } = useTranslation();
  const openedClass = 'right-0';
  const { isSideBarOpened }: any = useSidebarStore();
  const { isSession }: any = useSession();
  const { handleClickMenu } = useHandleClickMenu(useSidebarStore);
  const [toggleClass, setToggleClass] = useState(() => isSideBarOpened ? openedClass : '');
  const [isSignoutClick, setIsSignoutClick] = useState(false);
  const [displayedSnackBar, setDisplayedSnackBar] = useState(false);
  const [profileId, setProfileId] = useState(0);
  const [profiles, setProfiles] = useState(profilesData);
  const fetcher = useFetcher();
  const revalidator = useRevalidator();
  
  const handleClickSignOut = async () => {
    handleClickMenu();
    setIsSignoutClick(!isSignoutClick);
    localStorage.removeItem('sb_profile_id');
    window.location.reload();
  };

  const buttonSignInBlock = (
    <ItemListLayout data={authData[0]} 
                    linkClass='sidebar-link'
                    onClick={handleClickMenu}
                    isNotItem />
  );

  const buttonSignOutBlock = (
    <>
      {/* Bouton de DECONNEXION */}
        <fetcher.Form method="post">
          <Button type='submit'
                  className='sidebar-link w-full flex'
                  onClick={handleClickSignOut}>
            {authData[1]?.name}
          </Button>
        </fetcher.Form>
    </>
  );


  useEffect(() => {
    useSession.getState().setSession();
    const id = localStorage.getItem('sb_profile_id');
    setProfileId(id);
    setProfiles(() => profilesData.filter((profile) => profile.id == id));
  }, [])

  useEffect(() => {
    setProfileId(null);
  }, [isSignoutClick])

  useEffect(() => {
    setToggleClass(() => isSideBarOpened ? openedClass : '');
    useSession.getState().setSession();
  }, [isSideBarOpened])

  useEffect(() => {
    useSession.getState().setSession();
    const id = localStorage.getItem('sb_profile_id');
    setProfileId(id);

    if (data?.isDisplayedSnackBar) {
      setDisplayedSnackBar(data?.isDisplayedSnackBar);
      setTimeout(() => {
        setDisplayedSnackBar(false);
      }, 3000);
    }
  }, [data])


  return (
    <>
      {/* OVERLAY */}
      {
        isSideBarOpened && (
          <Button className='overlay' onClick={handleClickMenu}></Button>
        )
      }

      <nav className={`sidebar ${toggleClass}`}>
        {/* Menu PRINCIPAL */}
        <ul className='flex flex-col'>
          {
            mainData?.map((item: ItemSidebarInterface) => (
              <li key={uuidv4()} >
                <ul>
                  {
                    item.isBlank
                      ? (
                        <ItemListLayout data={item} 
                                        isBlank={true}
                                        linkClass='sidebar-link'
                                        onClick={handleClickMenu} />
                      )
                      : (
                        <ItemListLayout data={item} 
                                        linkClass='sidebar-link'
                                        onClick={handleClickMenu} />
                      )
                  }
                </ul>
              </li>
            ))
          }
        </ul>

        {/* PROFILE */}
        <aside className='sidebar-body'>
          <h2 className='h2 my-0 px-5 pt-5 pb-3 flex items-center'>
            {t('profileText')}
            {
              isSession && profileId 
                ? (<img src='/images/icons/picto-phb.webp' alt={t('logoProfileText')} className='sidebar-icon' />)
                : (<UserCircleIcon className='sidebar-icon' />)
            }
          </h2>
          {
            isSession && profileId 
              ? (
                profilesData?.map((profile) => (
                  <div key={profile.id}>
                    {
                      profile.id == profileId && (
                        <div className='pb-5'>
                          <div className='px-5 font-light'>
                            {profile.first_name}
                            <span className='uppercase'> {profile.last_name}</span>
                          </div>
                          { isSession && buttonSignOutBlock }
                        </div>
                      )
                    }
                  </div>
              ))
            )
            : (
              <div className='pb-5'>
                {buttonSignInBlock}
              </div>
            )
          }
        </aside>
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
