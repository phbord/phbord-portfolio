import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/20/solid';


import useLangStore from '~/services/store/useLangStore';
import useSidebarStore from '~/services/store/useSidebarStore';
import logo from 'public/images/svg/svg-logo-gold.svg';
import Button from '~/components/ui/Button';


export default function Header() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();

  const handleClickLang = () => {
    useLangStore.getState().setNewLang();
  };

  const handleClickMenu = () => useSidebarStore.getState().setSideBarOpened();

  const logoBlock = (
    <h1 className="flex">
      <Link to={'/'} className='header-link'>
        <figure className='header-figure'>
          <span className="sr-only">
            {t('logoHeaderText')}
          </span>
          <img className="header-logo" 
                src={logo} 
                alt={t('logoHeaderText')} />
          <figcaption className='header-figcaption'>
            <div className='header-title-name'>
              {t('firstName')} {t('lastName')}
            </div>
            <div className='header-title-position'>
              {t('position')}
            </div>
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
          
          {/* BOUTONS */}
          <div className="flex justify-end items-center">
            {/* Bouton LANGUE */}
            <Button 
              className='btn-lang' 
              onClick={handleClickLang}>
              {newLang === 'en' ? 'Fr' : 'En'}
            </Button>
            {/* Bouton MENU */}
            <Button 
              className='btn-burger-menu ml-1' 
              srOnlyText={t('logoBurgerText')}
              onClick={handleClickMenu}>
              <EllipsisHorizontalCircleIcon className="icon-burger-menu" aria-hidden="true" />
            </Button>
          </div>
        </nav>
      </header>
    </>
  )
}
