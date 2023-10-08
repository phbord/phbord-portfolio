import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import logo from 'public/images/icons/picto-phb.png';
import ItemListLayout from '~/components/layout/ItemListLayout';
import Tooltip from "~/components/ui/Tooltip";


export default function Footer() {
  const { t } = useTranslation();
  const menuData = t('header', { returnObjects: true });
  const keywordsData = t('mainKeywords', { returnObjects: true });
  const socialNetworkData = t('socialNetwork', { returnObjects: true });
  const technologiesUsedData = t('technologiesUsed', { returnObjects: true });
  const [newIndex, setNewIndex] = useState(-1);
  const [newName, setNewName] = useState('');

  const handleMouseOver = (index: number, name: string) => {
    setNewIndex(index);
    setNewName(name);
  };
  
  const handleMouseOut = (index: number) => {
    setNewIndex(-1);
    setNewName('');
  };

  const socialNetworksBlock = (
    <ul className='flex'>
      {
        socialNetworkData?.map((item, index) =>(
          <li key={uuidv4()} className="relative">
            <ItemListLayout key={uuidv4()}
                      data={item} 
                      itemClass={''} 
                      linkClass={''} 
                      imgClass={'w-5 mr-2'} 
                      textClass={'sr-only'} 
                      tooltipClass={'tooltips-snt'}
                      imgSrc={`/images/svg/${item.picto}`}
                      index={index}
                      onMouseOver={() => handleMouseOver(index, item.name)} 
                      onMouseOut={() => handleMouseOut(index)} />
            {/* TOOLTIPS */}
            {
              newIndex === index 
                && <Tooltip name={newName} 
                            className='tooltips-footer' />
            }
          </li>
        ))
      }
    </ul>
  );

  const infosBlock = (
    <div className='mb-3 flex items-center text-xs'>
      <span className='mr-4'>© {t('firstName')} {t('lastName')} 2023</span>
      <span className='sr-only'>{t('logoHeaderText')}</span>
      <img src={logo} alt={t('logoHeaderText')} className='w-8' />
    </div>
  );

  const technologiesBlock = (
    <ul className='flex'>
      {
        technologiesUsedData?.map((item) =>(
          <ItemListLayout key={uuidv4()} 
                    data={item} 
                    itemClass={''} 
                    linkClass={''} 
                    imgClass={'w-5 mr-2'} 
                    textClass={'sr-only'} 
                    imgSrc={`/images/svg/${item.picto}`} />
        ))
      }
    </ul>
  );

  return (
    <footer className='footer'>
      <div className='container-custom'>
        <nav className='grid grid-cols-3 gap-5'>
          {/* COLONNE 01 : Menu */}
          <ul>
            {
              menuData?.map((item) => (
                <ItemListLayout key={uuidv4()} 
                          data={item} 
                          itemClass='mb-1.5'
                          linkClass='hover:text-orange-500 transition-all' />
              ))
            }
          </ul>
          {/* COLONNE 02 : Mots-clés */}
          <ul>
            {
              keywordsData?.map((item) =>(
                <li key={uuidv4()} className=''>
                  <span className=''>{item}</span>
                </li>
              ))
            }
          </ul>
          {/* COLONNE 03 : Infos */}
          <div className='flex flex-col justify-between'>
            {/* 3.1 Réseaux sociaux + Infos */}
            <div>
              {infosBlock}
              {socialNetworksBlock}
            </div>
            {/* 3.2 Technologies */}
            <div>
              <div className='mb-2 text-xs'>Powered by</div>
              {technologiesBlock}
            </div>
          </div>
        </nav>
      </div>
    </footer>
  )
}
