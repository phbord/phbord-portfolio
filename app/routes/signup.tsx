import { useTranslation } from "react-i18next";

import useLangStore from '~/services/store/useLangStore';
import { signUp } from "~/services/auth";
import AuthForm from "~/components/pages/AuthForm";


export async function action({request}) {
  const formData: FormData = await request.formData();
  const emailValue: FormDataEntryValue | null = formData.get('email');
  const passwordValue: FormDataEntryValue | null = formData.get('password');

  if (emailValue !== 'phbord@gmail.com' || emailValue !== 'phbord@protonmail.com') {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const res = await signUp(emailValue, passwordValue);
  if (res) {
    return {
      isValid: true,
      isDisplayedSnackBar: true,
      redirectionPath: '/',
      message: 'signupSnackbarText'
    }
  }
  return {
    isValid: false,
    isDisplayedSnackBar: true,
    redirectionPath: '/',
    message: 'signupSnackbarErrorText'
  }
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
