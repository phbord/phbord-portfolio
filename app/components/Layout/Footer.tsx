import { useTranslation } from 'react-i18next';
import { Link } from '@remix-run/react';
import { v4 as uuidv4 } from 'uuid';
import { EnvelopeIcon } from '@heroicons/react/20/solid';

import ItemListLayout from '~/components/Layout/ItemListLayout';


export default function Footer() {
  const { t } = useTranslation();
  const menuData = t('header', { returnObjects: true });
  const keywordsData = t('mainKeywords', { returnObjects: true });
  const socialNetworkData = t('socialNetwork', { returnObjects: true });
  const technologiesUsedData = t('technologiesUsed', { returnObjects: true });

  return (
    <footer className='footer'>
      <div className='container-custom'>
        <nav className='grid grid-cols-3 gap-5'>
          {/* COLONNE 01 : Menu */}
          <ul className=''>
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
          <ul className=''>
            {
              keywordsData?.map((item) =>(
                <li key={uuidv4()} className=''>
                  <span className=''>{item}</span>
                </li>
              ))
            }
          </ul>
          {/* COLONNE 03 : Infos */}
          <div className=''>
            {/* Réseaux sociaux */}
            <ul className='footer-social-network-list'>
              <li className=''>
                <Link to='mailto:phbord@gmail.com'>
                  <span className='sr-only'>email</span>
                  <EnvelopeIcon className='footer-social-network-img' />
                </Link>
              </li>
              {
                socialNetworkData?.map((item) =>(
                  <ItemListLayout key={uuidv4()}
                            data={item} 
                            itemClass={''} 
                            linkClass={''} 
                            imgClass={'footer-social-network-img'} 
                            textClass={'sr-only'} 
                            imgSrc={`/images/svg/${item.picto}`} />
                ))
              }
            </ul>
            {/* Infos */}
            <div className='mt-4 text-xs'>
              © {t('firstName')} {t('lastName')} 2023
            </div>
            {/* Technologies */}
            <div className=''>
              <div className='footer-technologies-used-text'>Powered by</div>
              <ul className='footer-technologies-used-list'>
                {
                  technologiesUsedData?.map((item) =>(
                    <ItemListLayout key={uuidv4()} 
                              data={item} 
                              itemClass={''} 
                              linkClass={''} 
                              imgClass={'footer-technologies-used-img'} 
                              textClass={'sr-only'} 
                              imgSrc={`/images/svg/${item.picto}`} />
                  ))
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  )
}
