import { useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import LinksForm from '~/components/pages/LinksForm';


export const meta: MetaFunction = () => {
  return [
    { title: `${metaGlobal.titleLinksNew}` },
    { property:"og:title", content: metaGlobal.titleLinksNew },
  ];
};

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const subtitleValue: FormDataEntryValue | null = formData.get('subtitle');
  const descriptionFrValue: FormDataEntryValue | null = formData.get('description-fr');
  const descriptionEnValue: FormDataEntryValue | null = formData.get('description-en');
  const urlValue: FormDataEntryValue | null = formData.get('url');
  const orderValue: FormDataEntryValue | null = formData.get('order');
  const importantValue: FormDataEntryValue | null = formData.get('important');

  if (!isInputTextValidate(titleFrValue)
      || !isInputTextValidate(titleEnValue)
      || !isInputTextValidate(subtitleValue)
      || !isInputTextValidate(urlValue)
      || !isInputTextValidate(orderValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    picto: pictoValue,
    title_fr: titleFrValue,
    title_en: titleEnValue,
    subtitle: subtitleValue,
    description_fr: descriptionFrValue,
    description_en: descriptionEnValue,
    url: urlValue,
    order: orderValue,
    is_important: importantValue,
  };
  const res = await postData({
    table: 'Links',
    values
  });

  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'savedSnackbarText',
      redirectionPath: '/links'
    })
  }
  return json({
    formData,
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'savedSnackbarErrorText'
  });
}


export default function LinksCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/links/create`) 
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
      <section className="container-form container-form--light container-form--bg-links bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createLinkText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <LinksForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
