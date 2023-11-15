import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import ExperiencesForm from '~/components/pages/ExperiencesForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
  const monthStartValue: FormDataEntryValue | null = formData.get('month-start');
  const yearStartValue: FormDataEntryValue | null = formData.get('year-start');
  const monthEndValue: FormDataEntryValue | null = formData.get('month-end');
  const yearEndValue: FormDataEntryValue | null = formData.get('year-end');
  const firmFrValue: FormDataEntryValue | null = formData.get('firm-fr');
  const firmEnValue: FormDataEntryValue | null = formData.get('firm-en');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const descriptionFrValue: FormDataEntryValue | null = formData.get('description-fr');
  const descriptionEnValue: FormDataEntryValue | null = formData.get('description-en');
  const stackValue: FormDataEntryValue | null = formData.get('stack');
  const esnFrValue: FormDataEntryValue | null = formData.get('esn-fr');
  const esnEnValue: FormDataEntryValue | null = formData.get('esn-en');
  const listFrValue: FormDataEntryValue | null = formData.get('list-fr');
  const listEnValue: FormDataEntryValue | null = formData.get('list-en');
  const importantValue: FormDataEntryValue | null = formData.get('important');

  if (!isInputTextValidate(monthStartValue) 
      || !isInputTextValidate(yearStartValue) 
      || !isInputTextValidate(firmFrValue)
      || !isInputTextValidate(firmEnValue)
      || !isInputTextValidate(descriptionFrValue)
      || !isInputTextValidate(descriptionEnValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    id: idValue,
    month_start: parseInt(monthStartValue),
    year_start: parseInt(yearStartValue),
    month_end: parseInt(monthEndValue),
    year_end: parseInt(yearEndValue),
    firm_fr: firmFrValue,
    firm_en: firmEnValue,
    description_fr: descriptionFrValue,
    description_en: descriptionEnValue,
    stack: stackValue,
    esn_fr: esnFrValue,
    esn_en: esnEnValue,
    picto: pictoValue,
    is_important: JSON.parse(importantValue),
    list_fr: listFrValue === '' ? '' : JSON.parse(listFrValue),
    list_en: listEnValue === '' ? '' : JSON.parse(listEnValue),
  };

  const res = await updateData({
    table: 'Experiences',
    values,
    match: { id: idValue }
  });

  if (res) {
    return json({
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'savedSnackbarText',
      redirectionPath: '/experiences'
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
  const options: object = { table: 'Experiences', orderBy: 'year_start', orderByBis: 'month_start' };
  const data = await getData(options);
  const id = parseInt(params.id);
  const dataLoader = data.filter((item) => item.id === id)[0];
  return json({
    dataLoader,
    id,
  });
}


export default function ExperiencesEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/experiences/${id}/edit`) 
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
            {t('editExperienceText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <ExperiencesForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
