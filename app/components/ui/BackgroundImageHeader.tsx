import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

import BackgroundImage from "./BackgroundImage";
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
            <figure className='mt-[4rem] flex items-center'>
              <span className='sr-only'>{t('logoProfileText')}</span>
              <img src="/images/ph-profile.png" alt={t('logoProfileText')} className='w-[4rem] h-[4rem] mr-3' />
              <figcaption className='text-base'>
                <p>
                  {
                    keywordsData?.map((item) =>(
                      <span key={uuidv4()} className='mr-2'>
                        {item}
                      </span>
                    ))
                  }
                </p>
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
              </figcaption>
            </figure>
          </BackgroundImage>
        )
      }
    </>
  )
}
