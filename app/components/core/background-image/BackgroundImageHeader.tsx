import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import useScrollYPositionStore from "~/services/store/useScrollYPositionStore";
import BackgroundImage from "~/components/core/background-image/BackgroundImage";
import Tooltip from "~/components/core/Tooltip";
import ItemListLayout from "~/components/layout/ItemListLayout";


interface BackgroundImageHeaderInterface {
  imgUrl: string;
  titleClass?: string;
  keywordsClass?: string;
}

export default function BackgroundImageHeader({imgUrl, titleClass, keywordsClass}: BackgroundImageHeaderInterface) {
  const { t } = useTranslation();
  const keywordsData = t('mainKeywords', { returnObjects: true });
  const socialNetworkData = t('socialNetwork', { returnObjects: true });
  const [newIndex, setNewIndex] = useState(-1);
  const [newName, setNewName] = useState('');
  const [isHiddenBgImgText, setIsHiddenBgImgText] = useState(false);
  const { newScrollYPosition } = useScrollYPositionStore();

  const handleMouseOver = (index: number, name: string): void => {
    setNewIndex(index);
    setNewName(name);
  };
  
  const handleMouseOut = (index: number): void => {
    setNewIndex(-1);
    setNewName('');
  };

  const toggleBgImage = () => newScrollYPosition > 20 
                                ? setIsHiddenBgImgText(true) 
                                : setIsHiddenBgImgText(false);


  useEffect(() => toggleBgImage(), [])

  useEffect(() => toggleBgImage(), [newScrollYPosition])


  return (
    <>
      {
        imgUrl && (
          <BackgroundImage containerClassName={`bg-img-header ${isHiddenBgImgText ? '-z-10' : 'z-0'}`}
                            contentClassName='bg-img-header-body'
                            imgUrl={imgUrl}>
            <div className={`bg-img-header-children ${isHiddenBgImgText ? 'opacity-0' : ''}`}>
              {/* HAUT */}
              <figure className='bg-img-header-figure'>
                {/* COLONNE GAUCHE */}
                <span className='sr-only'>{t('logoProfileText')}</span>
                <img src="/images/ph-profile.webp" alt={t('logoProfileText')} className='w-[4rem] h-[4rem] mr-3' />

                {/* COLONNE DROITE */}
                <figcaption className='bg-img-header-figcaption'>
                  <h2 className={titleClass}>
                    {t('position')}
                  </h2>
                  <ul className="bg-img-header-figcaption-list">
                    {
                      keywordsData?.map((item: any) =>(
                        <li key={uuidv4()} className={keywordsClass}>
                          {item}
                        </li>
                      ))
                    }
                  </ul>
                </figcaption>
              </figure>

              {/* BAS : Réseaux sociaux */}
              <h3 className="bg-img-header-h3">Contacts</h3>
              <ul className="background-image">
                {
                  socialNetworkData?.map((item: any, index: number) =>(
                    <li key={uuidv4()} className="relative">
                      <ul>
                        <ItemListLayout data={item} 
                                        imgClass={'w-5 mr-2'} 
                                        textClass={'hidden'} 
                                        imgSrc={`/images/svg/${item.picto}`}
                                        isBlank={true}
                                        onMouseOver={() => handleMouseOver(index, item.name)} 
                                        onMouseOut={() => handleMouseOut(index)} />
                      </ul>
                      {/* TOOLTIPS */}
                      {
                        newIndex === index 
                          && <Tooltip name={newName} 
                                      className='tooltips-snt' />
                      }
                    </li>
                  ))
                }
              </ul>
            </div>
          </BackgroundImage>
        )
      }
    </>
  )
}
