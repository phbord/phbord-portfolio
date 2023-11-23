import { useLoaderData, useNavigate } from '@remix-run/react';
import { json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useSession from '~/services/store/useSession';


export async function loader({params}) {
  const id = params.id;
  return json({
    id,
  });
}

export default function Profile() {
  const { id} = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const navigate = useNavigate();

  const protectRoute = () => isSession 
                              ? navigate(`/profile/${id}`) 
                              : navigate('/');


  useEffect(() => {
    protectRoute();
  }, [])

  useEffect(() => {
    protectRoute();
  }, [isSession])


  return (
    <div>Profile</div>
  )
}
