import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';

import HeaderDialogPopover from './HeaderDialogPopover'
import logo from '~/assets/images/picto-phb.png'


export default function Header() {
  const { t } = useTranslation();
  const headerData = t('header', { returnObjects: true })

  return (
    <header className='header space-container'>
      <nav className="header-nav" aria-label="Global">
        {/* LOGO */}
        <h1 className="flex">
          <Link to={'/'}>
            <figure className='flex items-center justify-between'>
              <span className="sr-only">{t('logoHeaderText')}</span>
              <img className="header-logo" src={logo} alt="" />
              <figcaption className='flex flex-col justify-center'>
                <div className='header-title-name'>{t('firstName')} {t('lastName')}</div>
                <div className='header-title-position'>{t('position')}</div>
              </figcaption>
            </figure>
          </Link>
        </h1>
        
        {/* DIALOG + POPOVER MENU */}
        <div className="flex justify-end">
          <HeaderDialogPopover data={headerData} />
        </div>
      </nav>
    </header>
  )
}
