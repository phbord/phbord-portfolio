import { Form, useActionData, useMatches, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInputEmailValidate, isInputPasswordValidate, isInputTextValidate } from "~/utils/formValidate";
import Button from "~/components/core/buttons/Button";
import FormMessage from "~/components/core/form/FormMessage";
import FormElementMessage from "~/components/core/form/FormElementMessage";
import InputPassword from "~/components/core/form/InputPassword";
import Input from "~/components/core/form/Input";
import SnackBar from "~/components/core/SnackBar";


interface AuthFormInterface {
  className?: string;
}

export default function AuthForm({className=''}: AuthFormInterface) {
  const { t } = useTranslation();
  const data = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isEmailErrorDisplayed, setIsEmailErrorDisplayed] = useState(false);
  const [isPasswordErrorDisplayed, setIsPasswordErrorDisplayed] = useState(false);
  const [isPasswordBisErrorDisplayed, setIsPasswordBisErrorDisplayed] = useState(false);
  const [isFirstnameErrorDisplayed, setIsFirstnameErrorDisplayed] = useState(false);
  const [isLastnameErrorDisplayed, setIsLastnameErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const passwordBisRef = useRef('');
  const firstnameRef = useRef('');
  const lastnameRef = useRef('');
  const matches = useMatches();
  const pathname = matches[1].pathname;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'email') {
      setIsEmailErrorDisplayed(() => isInputEmailValidate(emailRef.current.value) ? false : true);
    }
    if (e.target.id === 'password') {
      setIsPasswordErrorDisplayed(() => isInputPasswordValidate(passwordRef.current.value) ? false : true);
    }
    if (e.target.id === 'password-bis' && pathname === '/signup') {
      setIsPasswordBisErrorDisplayed(() => isInputPasswordValidate(passwordBisRef.current.value) ? false : true);
    }
    if (e.target.id === 'firstname' && pathname === '/signup') {
      setIsFirstnameErrorDisplayed(() => isInputTextValidate(firstnameRef.current.value) ? false : true);
    }
    if (e.target.id === 'lastname' && pathname === '/signup') {
      setIsLastnameErrorDisplayed(() => isInputTextValidate(lastnameRef.current.value) ? false : true);
    }
    
    if (pathname === '/signup') {
      setIsDisabled(() => isInputEmailValidate(emailRef.current.value) && isInputPasswordValidate(passwordRef.current.value) && passwordRef.current.value === passwordBisRef.current.value ? false : true);
    }
    else {
      setIsDisabled(() => isInputEmailValidate(emailRef.current.value) && isInputPasswordValidate(passwordRef.current.value) ? false : true);
    }
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
    data?.isDisplayedSnackBar && setTimeout(() => {
      navigate(data?.redirectionPath);
    }, 3000);
  }, [data])


  return (
    <>
      <Form method="post" className={`form ${className}`}>
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
                  isInputErrorDisplayed={isEmailErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isEmailErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
        </div>

        {/* Champ MOT DE PASSE */}
        <div className="mb-4">
          <label htmlFor="password" 
                  className="label">
            {t('passwordText')}
          </label>
          <InputPassword id="password" 
                          inputRef={passwordRef} 
                          isPasswordErrorDisplayed={isPasswordErrorDisplayed} 
                          onChange={handleChange} />
          <FormElementMessage className={isPasswordErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputPasswordWrongEntry')} />
        </div>

        {
          pathname === '/signup' && (
            <>
              {/* Champ MOT DE PASSE - Bis */}
              <div className="mb-4">
                <label htmlFor="password-bis" 
                        className="label">
                  {t('passwordConfirmationText')}
                </label>
                <InputPassword id="password-bis" 
                                inputRef={passwordBisRef} 
                                isPasswordBisErrorDisplayed={isPasswordBisErrorDisplayed} 
                                onChange={handleChange} />
                <FormElementMessage className={isPasswordBisErrorDisplayed ? '' : 'hidden'} 
                                    message={t('inputPasswordWrongEntry')} />
              </div>

              {/* Champ PRENOM */}
              <div className="mb-4">
                <label htmlFor="firstname" 
                        className="label">
                  {t('firstnameText')}
                </label>
                <Input id="firstname" 
                        type="text"
                        inputRef={firstnameRef}
                        isInputErrorDisplayed={isFirstnameErrorDisplayed}
                        onChange={handleChange} />
                <FormElementMessage className={isFirstnameErrorDisplayed ? '' : 'hidden'} 
                                    message={t('inputTextWrongEntry')} />
              </div>

            {/* Champ NOM */}
            <div className="mb-4">
              <label htmlFor="lastname" 
                      className="label">
                {t('lastnameText')}
              </label>
              <Input id="lastname" 
                      type="text"
                      inputRef={lastnameRef}
                      isInputErrorDisplayed={isLastnameErrorDisplayed}
                      onChange={handleChange} />
              <FormElementMessage className={isLastnameErrorDisplayed ? '' : 'hidden'} 
                                  message={t('inputTextWrongEntry')} />
            </div>
            </>
          )
        }

        {/* Bouton SUBMIT */}
        <Button disabled={isDisabled || isSubmitting}
                type="submit"
                className="mt-6 btn-submit-form">
          {isSubmitting ? t('submittingText') : t('submitText')}
        </Button>
      </Form>

      {/* SNACKBAR */}
      {
        data?.isDisplayedSnackBar
          ? data?.isValid
            ? (
              <SnackBar isSuccess modalClass="snackbar-slide-in">
                {t(data?.message)}
              </SnackBar>
            )
            : (
              <SnackBar isError modalClass="snackbar-slide-in">
                {t(data?.message)}
              </SnackBar>
            )
          : ''
      }
    </>
  )
}
