import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useLangStore from '~/services/store/useLangStore';
import useSession from '~/services/store/useSession';
import BackgroundImageHeader from '~/components/core/background-image/BackgroundImageHeader';
import KnowledgesForm from '~/components/core/form/KnowledgesForm';
import { getData } from '~/services/getData';


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  console.log('************** formData:', formData);
  
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
  const { newLang } = useLangStore();
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
      {/* IMAGE */}
      <BackgroundImageHeader imgUrl='/images/backgrounds/bg-map.jpg' 
                              titleClass='mb-1 text-[1.35rem] text-yellow-200' 
                              keywordsClass='mr-2' />
      
      {/* BODY */}
      <section className="container-custom mt-[18.5rem] bg-neutral-200">
        {/* H E A D E R */}
        <div className="flex justify-between">
          {/* TITRE */}
          <h2 className="h2 mr-3">
            {t('header.0.name', { returnObjects: true })}
          </h2>
        </div>

        {/* F O R M U L A I R E */}
        <KnowledgesForm />
      </section>
    </>
  )
}
