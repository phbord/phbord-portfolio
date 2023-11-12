import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import TrainingForm from '~/components/pages/TrainingForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
  const monthStartValue: FormDataEntryValue | null = formData.get('month-start');
  const yearStartValue: FormDataEntryValue | null = formData.get('year-start');
  const monthEndValue: FormDataEntryValue | null = formData.get('month-end');
  const yearEndValue: FormDataEntryValue | null = formData.get('year-end');
  const firmValue: FormDataEntryValue | null = formData.get('firm');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const descriptionValue: FormDataEntryValue | null = formData.get('description');
  const stackValue: FormDataEntryValue | null = formData.get('stack');
  const esnValue: FormDataEntryValue | null = formData.get('esn');
  const listValue: FormDataEntryValue | null = formData.get('list');

  if (!isInputTextValidate(monthStartValue) 
      || !isInputTextValidate(yearStartValue) 
      || !isInputTextValidate(firmValue) 
      || !isInputTextValidate(descriptionValue)
      || !isInputTextValidate(stackValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const values: object = {
    id: idValue,
    month_start: parseInt(monthStartValue),
    year_start: parseInt(yearStartValue),
    month_end: parseInt(monthStartValue),
    year_end: parseInt(yearEndValue),
    firm: firmValue,
    description: descriptionValue,
    stack: stackValue,
    esn: esnValue,
    picto: pictoValue,
    list: listValue === '' ? '' : JSON.parse(listValue),
  };
  console.log(')))))))))))))))))', values);
  const res = await updateData({
    table: 'Trainings',
    values,
    match: { id: idValue }
  });

  if (res) {
    console.log('))))))) if');
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
  const options: object = { table: 'Experiences', orderBy: 'month_start', orderByBis: 'year_end' };
  const data = await getData(options);
  const id = params.id;
  return json({
    dataLoader: data[id],
    id,
  });
}


export default function ExperiencesEdit() {
  return (
    <div></div>
  )
}
