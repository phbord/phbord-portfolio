import { redirect } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import useLangStore from '~/services/store/useLangStore';
import { signIn } from "~/services/auth";
import { isInputEmailValidate, isInputPasswordValidate } from "~/utils/formValidate";
import AuthForm from "~/components/core/form/AuthForm";
import { useActionData } from "@remix-run/react";
import { useEffect } from "react";


export async function action({request}) {
  const formData = await request.formData();

  if (!isInputEmailValidate(formData.get('email')) || !isInputPasswordValidate(formData.get('password'))) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const res = await signIn(formData.get('email'), formData.get('password'));
  console.log('---------- res:', res);
  
  if (res) {
    return {
      accessToken: res.session.access_token,
      isValid: true,
      isDisplayedSnackBar: true,
      redirectionPath: '/',
      message: 'signinSnackbarText'
    }
  }
  return {
    isValid: false,
    isDisplayedSnackBar: true,
    redirectionPath: '/',
    message: 'signinSnackbarErrorText'
  }
}

export default function Signin() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const dataMessage = {
    status: 200,
    message: t('inputWrongEntries')
  };
  const data = useActionData();

  useEffect(() => {
    data?.isValid && localStorage.setItem('access_token', data?.accessToken);
  }, [data])

  return (
    <>
    {/* BODY */}
    <section className="container-form container-form--light container-form--bg-body bg-neutral-200">
      <div className="content-form">
        {/* TITRE */}
        <h2 className="h2 text-white">
          {t('signinText')}
        </h2>

        {/* FORMULAIRE */}
        <AuthForm className="bg-[#FFFFFF5a]" />
      </div>
    </section>
  </>
  )
}
