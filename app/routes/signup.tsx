import { type MetaFunction } from "@remix-run/node";
import { useTranslation } from "react-i18next";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import useLangStore from '~/services/store/useLangStore';
import { signUp } from "~/services/auth";
import AuthForm from "~/components/pages/AuthForm";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleSignupIndex },
    { name: "description", content: metaGlobal.description },
    { name: "robots", content: metaGlobal.robots },
    { name: "keywords", content: metaGlobal.keywords },
    { name: "author", content: metaGlobal.author },
    { property:"og:title", content: metaGlobal.titleSignupIndex },
    { property:"og:type", content: metaGlobal.ogType },
    { property:"og:description", content: metaGlobal.description },
    { property:"og:url", content: metaGlobal.ogUrl },
    { property:"og:image", content: metaGlobal.ogImage },
  ];
};

export async function action({request}) {
  const formData: FormData = await request.formData();
  const emailValue = formData.get('email');
  const passwordValue: FormDataEntryValue | null = formData.get('password');
  const firstnameValue: FormDataEntryValue | null = formData.get('firstname');
  const lastnameValue: FormDataEntryValue | null = formData.get('lastname');

  if (emailValue !== 'phbord@gmail.com') {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const res = await signUp(emailValue, passwordValue, firstnameValue, lastnameValue);
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
      <section className="container-form container-form--light container-form--bg-signup bg-neutral-200">
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
