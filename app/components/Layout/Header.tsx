import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { Bars3Icon } from '@heroicons/react/20/solid';


import useSidebarStore from '~/services/store/useSidebarStore';
import logo from '~/assets/images/picto-phb.png';
import Button from '~/components/ui/Button';


export default function Header() {
  const { t } = useTranslation();
  const { isSideBarOpened } = useSidebarStore();

  const onClick = () => useSidebarStore.getState().setSideBarOpened();

  const logoBlock = (
    <h1 className="flex">
      <Link to={'/'}>
        <figure className='flex items-center justify-between'>
          <span className="sr-only">
            {t('logoHeaderText')}
          </span>
          <img className="header-logo" src={logo} alt="" />
          <figcaption className='flex flex-col justify-center'>
            <div className='header-title-name'>
              {t('firstName')} {t('lastName')}
            </div>
            <div className='header-title-position'>{t('position')}</div>
          </figcaption>
        </figure>
      </Link>
    </h1>
  );

  return (
    <>
      <header className='header space-container'>
        <nav className="header-nav" aria-label="Global">
          {/* LOGO */}
          {logoBlock}
          
          {/* DIALOG + POPOVER MENU */}
          <div className="flex justify-end">
            {/* BUTTON */}
            <Button 
              className='btn-burger-menu' 
              srOnlyText={t('logoBurgerText')}
              onClick={onClick}>
              <Bars3Icon className="icon-burger-menu" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </header>
    </>
  )
}
