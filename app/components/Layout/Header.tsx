import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

import HeaderDialogPopover from './HeaderDialogPopover'
import logo from '~/assets/images/picto-phb.png'


export default function Header() {
  const { t } = useTranslation();
  const headerData = t('header', { returnObjects: true })

  return (
    <header className='bg-white'>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* LOGO */}
        <h1 className="flex lg:flex-1 h1">
          <Link to={'/'} className="-m-1.5 p-1.5">
            <figure>
              <span className="btn-primary">Logo de Pierre-Henri Bord</span>
              <span className="sr-only">Logo de Pierre-Henri Bord</span>
              <img className="h-8 w-auto" src={logo} alt="" />
              <figcaption>
                <div>{t('firstName')} {t('lastName')}</div>
                <div>{t('position')}</div>
              </figcaption>
            </figure>
          </Link>
        </h1>
        
        {/* DIALOG + POPOVER MENU */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <HeaderDialogPopover data={headerData} />
        </div>
      </nav>
    </header>
  )
}
