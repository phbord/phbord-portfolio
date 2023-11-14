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
  const firmValue: FormDataEntryValue | null = formData.get('firm');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const descriptionValue: FormDataEntryValue | null = formData.get('description');
  const listValue: FormDataEntryValue | null = formData.get('list');
  const stackValue: FormDataEntryValue | null = formData.get('stack');
  const esnValue: FormDataEntryValue | null = formData.get('esn');

  if (!isInputTextValidate(monthStartValue) 
      || !isInputTextValidate(yearStartValue)
      || !isInputTextValidate(firmValue)
      || !isInputTextValidate(descriptionValue)) {
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
    firm: firmValue,
    picto: pictoValue,
    description: descriptionValue,
    list: listValue === '' ? '' : JSON.parse(listValue),
    stack: stackValue,
    esn: esnValue,
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
