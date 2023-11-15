import { useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import DownloadsForm from '~/components/pages/DownloadsForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const yearValue: FormDataEntryValue | null = formData.get('year');
  const importantValue: FormDataEntryValue | null = formData.get('important');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const diplomaFrValue: FormDataEntryValue | null = formData.get('diploma-fr');
  const diplomaEnValue: FormDataEntryValue | null = formData.get('diploma-en');
  const schoolValue: FormDataEntryValue | null = formData.get('school');
  const fileValue: FormDataEntryValue | null = formData.get('file');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const orderValue: FormDataEntryValue | null = formData.get('order');

  if (!isInputTextValidate(titleFrValue)
      || !isInputTextValidate(titleEnValue)
      || !isInputTextValidate(diplomaFrValue)
      || !isInputTextValidate(diplomaEnValue)
      || !isInputTextValidate(schoolValue)
      || !isInputTextValidate(fileValue)
      || !isInputTextValidate(orderValue)
      || !isInputTextValidate(yearValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    year: yearValue,
    is_important: importantValue,
    picto: pictoValue,
    title_fr: titleFrValue,
    title_en: titleEnValue,
    diploma_fr: diplomaFrValue,
    diploma_en: diplomaEnValue,
    school: schoolValue,
    file: fileValue,
    order: orderValue,
  };
  const res = await postData({
    table: 'Downloads',
    values
  });

  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'savedSnackbarText',
      redirectionPath: '/downloads'
    })
  }
  return json({
    formData,
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'savedSnackbarErrorText'
  });
}


export default function DownloadsCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/downloads/create`) 
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
      <section className="container-form container-form--light container-form--bg-downloads bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createDownloadText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <DownloadsForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
