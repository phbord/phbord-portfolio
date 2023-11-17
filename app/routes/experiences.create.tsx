import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import postData from '~/services/postData';
import ExperiencesForm from '~/components/pages/ExperiencesForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const monthStartValue: FormDataEntryValue | null = formData.get('month-start');
  const monthEndValue: FormDataEntryValue | null = formData.get('month-end');
  const yearStartValue: FormDataEntryValue | null = formData.get('year-start');
  const yearEndValue: FormDataEntryValue | null = formData.get('year-end');
  const firmFrValue: FormDataEntryValue | null = formData.get('firm-fr');
  const firmEnValue: FormDataEntryValue | null = formData.get('firm-en');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const descriptionFrValue: FormDataEntryValue | null = formData.get('description-fr');
  const descriptionEnValue: FormDataEntryValue | null = formData.get('description-en');
  const listFrValue: FormDataEntryValue | null = formData.get('list-fr');
  const listEnValue: FormDataEntryValue | null = formData.get('list-en');
  const stackValue: FormDataEntryValue | null = formData.get('stack');
  const esnFrValue: FormDataEntryValue | null = formData.get('esn-fr');
  const esnEnValue: FormDataEntryValue | null = formData.get('esn-en');
  const importantValue: FormDataEntryValue | null = formData.get('important');
  const positionFrValue: FormDataEntryValue | null = formData.get('position-fr');
  const positionEnValue: FormDataEntryValue | null = formData.get('position-en');
  const positionCodeValue: FormDataEntryValue | null = formData.get('position-code');

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
    month_start: parseInt(monthStartValue),
    month_end: parseInt(monthEndValue),
    year_start: parseInt(yearStartValue),
    year_end: parseInt(yearEndValue),
    firm_fr: firmFrValue,
    firm_en: firmEnValue,
    picto: pictoValue,
    is_important: importantValue,
    description_fr: descriptionFrValue,
    description_en: descriptionEnValue,
    list_fr: listFrValue === '' ? '' : JSON.parse(listFrValue),
    list_en: listEnValue === '' ? '' : JSON.parse(listEnValue),
    stack: stackValue,
    esn_fr: esnFrValue,
    esn_en: esnEnValue,
    position_fr: positionFrValue,
    position_en: positionEnValue,
    position_code: positionCodeValue,
  };
  const res = await postData({
    table: 'Experiences',
    values
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


export default function ExperiencesCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/experiences/create`) 
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
      <section className="container-form container-form--light container-form--bg-experiences bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createExperienceText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <ExperiencesForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
