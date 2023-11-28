import { useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import TrainingForm from '~/components/pages/TrainingForm';


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleTrainingsNew },
    { property:"og:title", content: metaGlobal.titleTrainingsNew },
  ];
};

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const dateStartValue: FormDataEntryValue | null = formData.get('date-start');
  const dateEndValue: FormDataEntryValue | null = formData.get('date-end');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const durationFrValue: FormDataEntryValue | null = formData.get('duration-fr');
  const durationEnValue: FormDataEntryValue | null = formData.get('duration-en');
  const schoolValue: FormDataEntryValue | null = formData.get('school');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const projectsListFrValue: FormDataEntryValue | null = formData.get('projects-list-fr');
  const projectsListEnValue: FormDataEntryValue | null = formData.get('projects-list-en');
  const importantValue: FormDataEntryValue | null = formData.get('important');

  if (!isInputTextValidate(dateStartValue) 
      || !isInputTextValidate(titleFrValue) 
      || !isInputTextValidate(titleEnValue)) {
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
    duration_fr: durationFrValue,
    duration_en: durationEnValue,
    school: schoolValue,
    picto: pictoValue,
    is_important: JSON.parse(importantValue),
    projects_fr: projectsListFrValue === '' ? '' : JSON.parse(projectsListFrValue),
    projects_en: projectsListEnValue === '' ? '' : JSON.parse(projectsListEnValue),
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
