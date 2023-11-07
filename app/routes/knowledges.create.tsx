import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import KnowledgesForm from '~/components/pages/KnowledgesForm';

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
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
    order: orderValue,
    title_fr: titleFrValue,
    title_en: titleEnValue,
    list: JSON.parse(iconListValue),
  };
  const res = await postData({
    table: 'Knowledges',
    values
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


export default function KnowledgeCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/knowledges/create`) 
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
      <section className="container-form container-form--light container-form--bg-body bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createKnowledgesText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <KnowledgesForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
