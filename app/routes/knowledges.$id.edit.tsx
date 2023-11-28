import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import KnowledgesForm from '~/components/pages/KnowledgesForm';


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleKnowledgesEdit },
    { property:"og:title", content: metaGlobal.titleKnowledgesEdit },
  ];
};

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
  const orderValue: FormDataEntryValue | null = formData.get('order');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const iconListValue: FormDataEntryValue | null = formData.get('icon-list');

  if (!isInputTextValidate(orderValue) 
      || !isInputTextValidate(titleFrValue) 
      || !isInputTextValidate(titleEnValue) 
      || !isInputTextObjectArrayValidate(iconListValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    id: idValue,
    order: orderValue,
    title_fr: titleFrValue,
    title_en: titleEnValue,
    list: JSON.parse(iconListValue),
  };
  const res = await updateData({
    table: 'Knowledges',
    values,
    match: { id: idValue }
  });
  
  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'savedSnackbarText',
      redirectionPath: '/'
    })
  }
  return json({
    formData,
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'savedSnackbarErrorText'
  });
}

export async function loader({params}) {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const data = await getData(options);
  const id = params.id;
  return json({
    dataLoader: data[id],
    id,
  });
}

export default function KnowledgeEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/knowledges/${id}/edit`) 
                              : navigate('/');


  useEffect(() => {
    protectRoute();
  }, [])

  useEffect(() => {
    protectRoute();
  }, [isSession])


  return (
    <>
      {/* BODY */}
      <section className="container-form container-form--light container-form--bg-knowledges bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('editKnowledgesText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <KnowledgesForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
