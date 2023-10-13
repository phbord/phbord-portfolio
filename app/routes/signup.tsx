import { redirect } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import useLangStore from '~/services/store/useLangStore';
import { isInputEmailValidate, isInputPasswordValidate } from "~/utils/formValidate";
import AuthForm from "~/components/core/form/AuthForm";


export async function action({request}) {
  const formData = await request.formData();
  const signupData = Object.fromEntries(formData);
  console.log(formData.get('email'), '))))))', signupData);

  if (!isInputEmailValidate(formData.get('email')) || !isInputPasswordValidate(formData.get('password'))) {
    return { isDisplayedError: true, messageType: 'inputWrongEntries' };
  }
  return redirect('/signup');
}

export default function Signup() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const dataMessage = {
    status: 200,
    message: "Saisie des champs incorrecte"
  };

  return (
    <>
      {/* BODY */}
      <section className="container-form mt-[4.5rem] bg-neutral-200">
        {/* TITRE */}
        <h2 className="h2">
          {t('signupText')}
        </h2>

        {/* FORMULAIRE */}
        <AuthForm />
      </section>
    </>
  )
}
