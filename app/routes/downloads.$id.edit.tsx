import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import DownloadsForm from '~/components/pages/DownloadsForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
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

  const res = await updateData({
    table: 'Downloads',
    values,
    match: { id: idValue }
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

export async function loader({params}) {
  const options: object = { table: 'Downloads', orderBy: 'year', orderByBis: 'order' };
  const data = await getData(options);
  const id = parseInt(params.id);
  const dataLoader = data.filter((item) => item.id === id)[0];
  return json({
    dataLoader,
    id,
  });
}


export default function DownloadsEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/downloads/${id}/edit`) 
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
            {t('editDownloadText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <DownloadsForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
