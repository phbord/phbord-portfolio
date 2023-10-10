import { type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import useLangStore from '~/services/store/useLangStore';
import BackgroundImageHeader from "~/components/ui/BackgroundImageHeader";
import Button from "~/components/ui/Button";
import { BoltIcon } from "@heroicons/react/20/solid";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};


export default function ObliqueStrategies() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const [sentence, setSentence] = useState('');

  const createRandomSentence = () => {
    const data = t('strategiesObliques', { returnObjects: true });
    const random = Math.floor(Math.random() * data.length)
    setSentence(data[random]);
    console.log(random, '>>>>>> createRandomSentence:', data[random]);
  };

  const handleClick = () => {
    console.log('))))))) handleClick');
    createRandomSentence();
  };


  useEffect(() => {
    createRandomSentence();
  }, [])

  useEffect(() => {
    createRandomSentence();
  }, [])


  return (
    <>
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-fuji.jpeg' 
                              titleClass='mb-1 text-[1.35rem] text-orange-600' 
                              keywordsClass='mr-2 text-orange-500' />
      
      {/* BODY */}
      <section className="container-custom mt-[18.5rem] bg-neutral-200">
        <h2 className="h2">
          {t('header.5.name', { returnObjects: true })}
        </h2>
        <p className="oblique-strategies-random">
          "{sentence}"
        </p>
        <div className="mb-10 flex justify-end">
          <Button className='oblique-strategies-btn' onClick={handleClick}>
            <BoltIcon className="oblique-strategies-btn-icon" />
            <span>{t('strategiesObliquesButton')}</span>
          </Button>
        </div>
        <p className="oblique-strategies-chapo">
          {t('strategiesObliquesChapo')}
        </p>
        <p className="oblique-strategies-paragraph">
          {t('strategiesObliquesParagraph')}
        </p>
      </section>
    </>
  )
}
