import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import useLangStore from '~/services/store/useLangStore';
import Button from "~/components/ui/Button";


export default function Signup() {
  const { t } = useTranslation();
  const { newLang } = useLangStore();

  return (
    <>
      {/* BODY */}
      <section className="container-form mt-[4.5rem] bg-neutral-200">
        {/* TITRE */}
        <h2 className="h2">
          {t('signupText')}
        </h2>

        {/* FORMULAIRE */}
        <Form className="form">
          {/* Champ EMAIL */}
          <div className="mb-4">
            <label htmlFor="email" 
                    className="label">
              Email
            </label>
            <input id="email" 
                    name="email" 
                    type="email" 
                    autoComplete="email" 
                    required 
                    className="input" />
          </div>
          {/* Champ MOT DE PASSE */}
          <div className="mb-6">
            <label htmlFor="password" 
                    className="label">
              {t('passwordText')}
            </label>
            <input id="password" 
                    name="password" 
                    type="password" 
                    autoComplete="current-password" 
                    required 
                    className="input" />
          </div>
          {/* Bouton SUBMIT */}
          <Button type="submit" 
                  className="btn-submit-form">
            Sign in
          </Button>
        </Form>
      </section>
    </>
  )
}
