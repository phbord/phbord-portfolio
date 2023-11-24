import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json, type MetaFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import TrainingForm from '~/components/pages/TrainingForm';


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleTrainingsEdit },
    { name: "description", content: metaGlobal.description },
    { robots: metaGlobal.robots },
    { keywords: metaGlobal.keywords },
    { author: metaGlobal.author },
    { property:"og:title", content: metaGlobal.titleTrainingsEdit },
    { property:"og:type", content: metaGlobal.ogType },
    { property:"og:description", content: metaGlobal.description },
    { property:"og:url", content: metaGlobal.ogUrl },
    { property:"og:image", content: metaGlobal.ogImage },
  ];
};

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
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
    id: idValue,
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
  const res = await updateData({
    table: 'Trainings',
    values,
    match: { id: idValue }
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

export async function loader({params}) {
  const options: object = { table: 'Trainings', orderBy: 'year_start', orderByBis: 'year_end' };
  const data = await getData(options);
  const id = params.id;
  return json({
    dataLoader: data[id],
    id,
  });
}


export default function TrainingEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/training/${id}/edit`) 
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
            {t('editTrainingText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <TrainingForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
