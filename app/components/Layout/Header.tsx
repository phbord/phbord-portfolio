import HeaderDialogPopover from './HeaderDialogPopover'
import headerData from '~/assets/data/headerData'
import logo from '~/assets/images/picto-phb.png'


export default function Header() {
  return (
    <header className='bg-white'>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo de Pierre-Henri Bord</span>
            <img className="h-8 w-auto" src={logo} alt="" />
          </a>
        </div>
        
        {/* DIALOG + POPOVER MENU */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <HeaderDialogPopover data={headerData} />
        </div>
      </nav>
    </header>
  )
}
