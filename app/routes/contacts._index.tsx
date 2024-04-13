import { useState } from "react";
import { type MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import useLangStore from '~/services/store/useLangStore';
import Button from "~/components/core/buttons/Button";
import ItemListContacts from "~/components/pages/ItemListContacts";
import ItemListLayout from "~/components/layout/ItemListLayout";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleContactsIndex },
    { property:"og:title", content: metaGlobal.titleContactsIndex },
  ];
};


export default function Contacts() {
  const { t } = useTranslation();
  const socialNetworkData = t('socialNetwork', { returnObjects: true });
  const [newIndex, setNewIndex] = useState(-1);
  const [newName, setNewName] = useState('');

  const handleMouseOver = (index: number, name: string): void => {
    setNewIndex(index);
    setNewName(name);
  };

  const handleMouseOut = (index: number): void => {
    setNewIndex(-1);
    setNewName('');
  };


  return (
    <>
      {/* BODY */}
      <section className="container-oblique-strategies bg-neutral-200">
        <div className="content-oblique-strategies">
          {/* Titre */}
          <h2 className="h2">
            Contacts
          </h2>
          <ul className="oblique-strategies-body">
            {
              socialNetworkData?.map((item: any, index: number) =>(
                <li key={uuidv4()} className="relative">
                  <ul className="contacts-list">
                    <ItemListLayout data={item}
                                    imgClass={'w-5 mr-2'}
                                    textClass={''}
                                    imgSrc={`/images/svg/${item.picto}`}
                                    isBlank={true}
                                    onMouseOver={() => handleMouseOver(index, item.name)}
                                    onMouseOut={() => handleMouseOut(index)} />
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </section>
    </>
  )
}
