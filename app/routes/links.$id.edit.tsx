import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import updateData from '~/services/updateData';
import LinksForm from '~/components/pages/LinksForm';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const idValue: FormDataEntryValue | null = formData.get('id');
  const pictoValue: FormDataEntryValue | null = formData.get('picto');
  const titleFrValue: FormDataEntryValue | null = formData.get('title-fr');
  const titleEnValue: FormDataEntryValue | null = formData.get('title-en');
  const subtitleValue: FormDataEntryValue | null = formData.get('subtitle');
  const descriptionFrValue: FormDataEntryValue | null = formData.get('description-fr');
  const descriptionEnValue: FormDataEntryValue | null = formData.get('description-en');
  const urlValue: FormDataEntryValue | null = formData.get('url');
  const orderValue: FormDataEntryValue | null = formData.get('order');

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
  };

  const res = await updateData({
    table: 'Links',
    values,
    match: { id: idValue }
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

export async function loader({params}) {
  const options: object = { table: 'Links', orderBy: 'order' };
  const data = await getData(options);
  const id = parseInt(params.id);
  const dataLoader = data.filter((item) => item.id === id)[0];
  return json({
    dataLoader,
    id,
  });
}


export default function LinksEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/links/${id}/edit`) 
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
            {t('editLinkText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <LinksForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
