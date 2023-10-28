import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import KnowledgesForm from '~/components/core/form/KnowledgesForm';
import { getData } from '~/services/getData';
import { PencilIcon } from '@heroicons/react/20/solid';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  //console.log('************** formData:', formData);
  
  return json({});
}

export async function loader({params}) {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const data = await getData(options);
  const id = params.id;
  return json({
    dataLoader: data[id],
    id,
  });
}

export default function KnowledgeEdit() {
  const { dataLoader, id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();
  //console.log('dataLoader --->', dataLoader);

  const protectRoute = () => isSession 
                              ? navigate(`/knowledges/${id}/edit`) 
                              : navigate('/');


  useEffect(() => {
    console.log('isSession --->', isSession);
    protectRoute();
  }, [])

  useEffect(() => {
    protectRoute();
  }, [isSession])


  return (
    <>
    {/* BODY */}
      <section className="container-form container-form--light container-form--bg-body bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('header.0.name', { returnObjects: true })}
          </h2>
          <h3 className="h3 mb-2 text-white flex items-center">
            <PencilIcon className='w-7 h-7 mr-2 p-1 border rounded-[50%] flex justify-center items-center' />
            <span>{t('buttonEditText')}</span>
          </h3>

          {/* FORMULAIRE */}
          <KnowledgesForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
