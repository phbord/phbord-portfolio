import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInputEmailValidate, isInputPasswordValidate } from "~/utils/formValidate";
import Button from "~/components/core/buttons/Button";
import FormMessage from "~/components/core/form/FormMessage";
import FormElementMessage from "~/components/core/form/FormElementMessage";
import InputPassword from "~/components/core/form/InputPassword";
import Input from "~/components/core/form/Input";


export default function AuthForm() {
  const { t } = useTranslation();
  const data = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isEmailErrorDisplayed, setIsEmailErrorDisplayed] = useState(false);
  const [isPasswordErrorDisplayed, setIsPasswordErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  const handlehange = (): void => {
    if (emailRef.current.id === 'email') {
      setIsEmailErrorDisplayed(() => isInputEmailValidate(emailRef.current.value) ? false : true);
    }
    if (passwordRef.current.id === 'password') {
      setIsPasswordErrorDisplayed(() => isInputPasswordValidate(passwordRef.current.value) ? false : true);
    }
    setIsDisabled(() => isInputEmailValidate(emailRef.current.value) && isInputPasswordValidate(passwordRef.current.value) ? false : true);
  };

  const getErrorMessage = (data: { messageType: any; } | undefined) => {
    if (!data) {
      return;
    }
    switch (data.messageType) {
      case 'inputWrongEntries':
        setDataForm({ message: t('inputWrongEntries') });
        break;
      default:
        setDataForm({ message: t('inputWrongEntries') });
        break;
    }
  };


  useEffect(() => {
    getErrorMessage(data);
  }, [])

  useEffect(() => {
    getErrorMessage(data);
  }, [data])


  return (
    <>
      <Form method="post" className="form">
        {/* Bloc MESSAGE */}
        {
          data?.isDisplayedError && data?.messageType
            && (
              <FormMessage data={dataForm} isError />
            )
        }

        {/* Champ EMAIL */}
        <div className="mb-4">
          <label htmlFor="email" 
                  className="label">
            Email
          </label>
          <Input id="email" 
                  type="email" 
                  inputRef={emailRef}
                  autoComplete="email" 
                  isInputErrorDisplayed={isEmailErrorDisplayed}
                  onChange={handlehange} />
          <FormElementMessage className={isEmailErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
        </div>

        {/* Champ MOT DE PASSE */}
        <div className="mb-6">
          <label htmlFor="password" 
                  className="label">
            {t('passwordText')}
          </label>
          <InputPassword id="password" 
                          inputRef={passwordRef} 
                          autoComplete="password" 
                          isPasswordErrorDisplayed={isPasswordErrorDisplayed} 
                          onChange={handlehange} />
          <FormElementMessage className={isPasswordErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputPasswordWrongEntry')} />
        </div>

        {/* Bouton SUBMIT */}
        <Button disabled={isDisabled}
                className="btn-submit-form">
          {t('submitText')}
        </Button>
      </Form>
    </>
  )
}
