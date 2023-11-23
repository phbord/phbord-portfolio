import { type MetaFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import useLangStore from '~/services/store/useLangStore';
import Button from "~/components/core/buttons/Button";
import { BoltIcon } from "@heroicons/react/20/solid";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleObliqueStrategiesIndex },
    { name: "description", content: metaGlobal.description },
  ];
};


export default function ObliqueStrategies() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const [sentence, setSentence] = useState('');
  const titlePage = t('header.5.name', { returnObjects: true });

  const createRandomSentence = () => {
    const data = t('strategiesObliques', { returnObjects: true });
    const random = Math.floor(Math.random() * data.length)
    setSentence(data[random]);
  };

  const handleClick = () => {
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
      {/* BODY */}
      <section className="container-oblique-strategies bg-neutral-200">
        <div className="content-oblique-strategies">
          {/* Titre */}
          <h2 className="h2">
            {titlePage}
          </h2>
          <div className="oblique-strategies-body">
            {/* Citation */}
            <blockquote>
              <p className="oblique-strategies-random">
                "{sentence}"
              </p>
            </blockquote>
            {/* Bouton */}
            <div className="mb-10 flex justify-end">
              <Button className='oblique-strategies-btn' onClick={handleClick}>
                <BoltIcon className="oblique-strategies-btn-icon" />
                <span>{t('strategiesObliquesButton')}</span>
              </Button>
            </div>
            {/* Chapô */}
            <p className="oblique-strategies-chapo">
              {t('strategiesObliquesChapo')}
            </p>
            {/* Description */}
            <p className="oblique-strategies-paragraph">
              {t('strategiesObliquesParagraph')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
