import { useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useSession from '~/services/store/useSession';
import KnowledgesForm from '~/components/core/form/KnowledgesForm';
import { getData } from '~/services/getData';


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
            {t('editKnowledgesText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <KnowledgesForm className="bg-[#FFFFFF5a]" data={dataLoader} />
        </div>
      </section>
    </>
  )
}
