import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import TrainingForm from '~/components/pages/TrainingForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const dateStartValue: FormDataEntryValue | null = formData.get('date-start');
  const dateEndValue: FormDataEntryValue | null = formData.get('date-end');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const durationValue: FormDataEntryValue | null = formData.get('duration');
  const schoolValue: FormDataEntryValue | null = formData.get('school');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const projectsListValue: FormDataEntryValue | null = formData.get('projects-list');
  const importantValue: FormDataEntryValue | null = formData.get('important');

  if (!isInputTextValidate(dateStartValue) 
      || !isInputTextValidate(titleFrValue) 
      || !isInputTextValidate(titleEnValue) 
      || !isInputTextValidate(schoolValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    year_start: parseInt(dateStartValue),
    year_end: parseInt(dateEndValue),
    title_fr: titleFrValue,
    title_en: titleEnValue,
    duration: durationValue,
    school: schoolValue,
    picto: pictoValue,
    is_important: JSON.parse(importantValue),
    projects: projectsListValue === '' ? '' : JSON.parse(projectsListValue),
  };
  const res = await postData({
    table: 'Trainings',
    values
  });

  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'savedSnackbarText',
      redirectionPath: '/training'
    })
  }
  return json({
    formData,
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'savedSnackbarErrorText'
  });
}


export default function TrainingCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/training/create`) 
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
      <section className="container-form container-form--light container-form--bg-trainings bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createTrainingText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <TrainingForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
