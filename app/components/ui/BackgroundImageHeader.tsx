import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

import BackgroundImage from "~/components/ui/BackgroundImage";
import ItemListLayout from "~/components/layout/ItemListLayout";


export default function BackgroundImageHeader({imgUrl}) {
  const { t } = useTranslation();
  const keywordsData = t('mainKeywords', { returnObjects: true });
  const socialNetworkData = t('socialNetwork', { returnObjects: true });

  return (
    <>
      {
        imgUrl && (
          <BackgroundImage containerClassName='bg-img-header'
                            contentClassName='bg-img-header-body'
                            imgUrl={imgUrl}>
            <div className="h-full mt-[4rem] flex flex-col justify-between">
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

              {/* BAS */}
              <ul className="mt-1 flex">
                {
                  socialNetworkData?.map((item) =>(
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
            </div>
          </BackgroundImage>
        )
      }
    </>
  )
}
