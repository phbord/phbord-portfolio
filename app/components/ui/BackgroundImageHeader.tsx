import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import BackgroundImage from "~/components/ui/BackgroundImage";
import ItemListLayout from "~/components/layout/ItemListLayout";
import Tooltip from "~/components/ui/Tooltip";
import useScrollYPosition from "~/services/store/useScrollYPosition";


export default function BackgroundImageHeader({imgUrl}) {
  const { t } = useTranslation();
  const keywordsData = t('mainKeywords', { returnObjects: true });
  const socialNetworkData = t('socialNetwork', { returnObjects: true });
  const [newIndex, setNewIndex] = useState(-1);
  const [newName, setNewName] = useState('');
  const [isHiddenBgImgText, setIsHiddenBgImgText] = useState(false);
  const { newScrollYPosition } = useScrollYPosition();

  const handleMouseOver = (index: number, name: string): void => {
    setNewIndex(index);
    setNewName(name);
  };
  
  const handleMouseOut = (index: number): void => {
    setNewIndex(-1);
    setNewName('');
  };

  const toggleBgImage = () => newScrollYPosition > 40 
                                ? setIsHiddenBgImgText(true) 
                                : setIsHiddenBgImgText(false);


  useEffect(() => toggleBgImage(), [])

  useEffect(() => toggleBgImage(), [newScrollYPosition])


  return (
    <>
      {
        imgUrl && (
          <BackgroundImage containerClassName='bg-img-header'
                            contentClassName='bg-img-header-body'
                            imgUrl={imgUrl}>
            <div className={`bg-img-header-children ${isHiddenBgImgText ? 'opacity-0' : ''}`}>
              {/* HAUT */}
              <figure className='flex items-center'>
                {/* COLONNE GAUCHE */}
                <span className='sr-only'>{t('logoProfileText')}</span>
                <img src="/images/ph-profile.png" alt={t('logoProfileText')} className='w-[4rem] h-[4rem] mr-3' />

                {/* COLONNE DROITE */}
                <figcaption className='bg-img-header-figcaption'>
                  <h2 className="mb-1 text-[1.35rem] text-yellow-200">
                    {t('position')}
                  </h2>
                  <p>
                    {
                      keywordsData?.map((item) =>(
                        <span key={uuidv4()} className='mr-2'>
                          {item}
                        </span>
                      ))
                    }
                  </p>
                </figcaption>
              </figure>

              {/* BAS : Réseaux sociaux */}
              <ul className="mt-1 flex">
                {
                  socialNetworkData?.map((item, index) =>(
                    <li key={uuidv4()} className="relative">
                      <ItemListLayout data={item} 
                                      imgClass={'w-5 mr-2'} 
                                      textClass={'hidden'} 
                                      tooltipClass={'tooltips-snt'}
                                      imgSrc={`/images/svg/${item.picto}`}
                                      index={index}
                                      onMouseOver={() => handleMouseOver(index, item.name)} 
                                      onMouseOut={() => handleMouseOut(index)} />
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
