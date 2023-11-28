import { ActionFunctionArgs, json, type MetaFunction } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import useLangStore from '~/services/store/useLangStore';
import { signIn } from "~/services/auth";
import { isInputEmailValidate, isInputPasswordValidate } from "~/utils/formValidate";
import AuthForm from "~/components/pages/AuthForm";
import { isSbSession, sbSession } from "~/services/cookies";
import getData from "~/services/getData";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.titleSignupIndex },
    { property:"og:title", content: metaGlobal.titleSignupIndex },
  ];
};

export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const emailValue: FormDataEntryValue | null = formData.get('email');
  const passwordValue: FormDataEntryValue | null = formData.get('password');

  if (!isInputEmailValidate(emailValue) || !isInputPasswordValidate(passwordValue)) {
    return {
      isDisplayedError: true,
      messageType: 'inputWrongEntries'
    };
  }

  const res = await signIn(emailValue, passwordValue);
  
  if (res) {
    const options: object = { table: 'Profile', columns: 'id', match: { user_id: res.user.id } };
    const data = await getData(options);
    const cookieHeader = request.headers.get("Cookie");
    const sessionCookie = sbSession(res.access_token);
    
    return json({
      cookieHeader,
      signIn: res,
      accessToken: res,
      profileId: data[0].id,
      isValid: true,
      isDisplayedSnackBar: true,
      message: 'signinSnackbarText'
    },
    {
      headers: {
        "Set-Cookie": await sessionCookie.serialize({}),
      },
    })
  }
  return {
    isValid: false,
    isDisplayedSnackBar: true,
    message: 'signinSnackbarErrorText'
  }
}

export default function Signin() {
  const data = useActionData();
  const { t } = useTranslation();
  const { newLang } = useLangStore();
  const navigate = useNavigate();
  const dataMessage = {
    status: 200,
    message: t('inputWrongEntries')
  };


  useEffect(() => {
    isSbSession() && navigate('/');
  }, [])

  useEffect(() => {
    (isSbSession() || data?.isValid) && navigate('/');
    localStorage.setItem('sb_profile_id', data?.profileId);
  }, [data])


  return (
    <>
      {/* BODY */}
      <section className="container-form container-form--light container-form--bg-signin bg-neutral-200">
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
