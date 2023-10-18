import { redirect } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import useLangStore from '~/services/store/useLangStore';
import { signUp } from "~/services/auth";
import { isInputEmailValidate, isInputPasswordValidate } from "~/utils/formValidate";
import AuthForm from "~/components/core/form/AuthForm";


export async function action({request}) {
  const formData = await request.formData();

  if (!isInputEmailValidate(formData.get('email')) || !isInputPasswordValidate(formData.get('password'))) {
    return { isDisplayedError: true, messageType: 'inputWrongEntries' };
  }
  signUp(formData.get('email'), formData.get('password'));
  return redirect('/');
}

export default function Signup() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const dataMessage = {
    status: 200,
    message: t('inputWrongEntries')
  };

  return (
    <>
      {/* BODY */}
      <section className="container-form container-form--light container-form--bg-body bg-neutral-200">
        <div className="content-form">
          {/* TITRE */}
          <h2 className="h2 text-white">
            {t('signupText')}
          </h2>

          {/* FORMULAIRE */}
          <AuthForm className="bg-[#FFFFFF5a]" />
        </div>
      </section>
    </>
  )
}
