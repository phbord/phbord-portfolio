import { useActionData, useLoaderData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { isInputTextObjectArrayValidate, isInputTextValidate } from '~/utils/formValidate';
import useSession from '~/services/store/useSession';
import KnowledgesForm from '~/components/core/form/KnowledgesForm';

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();

  return json({});
}


export default function KnowledgeCreate() {
  const { t } = useTranslation();
  const { isSession }: any = useSession();

  return (
    <>
      {/* BODY */}
      <section className="container-form container-form--light container-form--bg-body bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('createKnowledgesText', { returnObjects: true })}
          </h2>

          {/* FORMULAIRE */}
          <KnowledgesForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
