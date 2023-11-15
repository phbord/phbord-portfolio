import { Form, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInputNumberValidate, isInputTextObjectArrayValidate, isInputTextValidate } from "~/utils/formValidate";
import FormMessage from "~/components/core/form/FormMessage";
import FormElementMessage from "~/components/core/form/FormElementMessage";
import Input from "~/components/core/form/Input";
import Textarea from "~/components/core/form/Textarea";
import Button from "~/components/core/buttons/Button";
import SnackBar from "~/components/core/SnackBar";
import BinaryRadioButton from "../core/form/BinaryRadioButton";


interface DownloadsFormInterface {
  className?: string;
  data?: any;
}


export default function DownloadsForm({className='', data}: DownloadsFormInterface) {
  const { t } = useTranslation();
  const dataAction = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isYearErrorDisplayed, setIsYearErrorDisplayed] = useState(false);
  const [isIsImportantErrorDisplayed, setIsIsImportantErrorDisplayed] = useState(false);
  const [isOrderErrorDisplayed, setIsOrderErrorDisplayed] = useState(false);
  const [isPictoErrorDisplayed, setIsPictoErrorDisplayed] = useState(false);
  const [isTitleFrErrorDisplayed, setIsTitleFrErrorDisplayed] = useState(false);
  const [isTitleEnErrorDisplayed, setIsTitleEnErrorDisplayed] = useState(false);
  const [isDiplomaFrErrorDisplayed, setIsDiplomaFrErrorDisplayed] = useState(false);
  const [isDiplomaEnErrorDisplayed, setIsDiplomaEnErrorDisplayed] = useState(false);
  const [isSchoolErrorDisplayed, setIsSchoolErrorDisplayed] = useState(false);
  const [isFileErrorDisplayed, setIsFileErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [yearValue, setYearValue] = useState('');
  const [isImportantValue, setIsImportantValue] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [pictoValue, setPictoValue] = useState('');
  const [titleFrValue, setTitleFrValue] = useState('');
  const [titleEnValue, setTitleEnValue] = useState('');
  const [diplomaFrValue, setDiplomaFrValue] = useState('');
  const [diplomaEnValue, setDiplomaEnValue] = useState('');
  const [schoolValue, setSchoolValue] = useState('');
  const [fileValue, setFileValue] = useState('');
  const idRef = useRef('');
  const yearRef = useRef('');
  const isImportantRef = useRef('');
  const orderRef = useRef('');
  const pictoRef = useRef('');
  const titleFrRef = useRef('');
  const titleEnRef = useRef('');
  const diplomaFrRef = useRef('');
  const diplomaEnRef = useRef('');
  const schoolRef = useRef('');
  const fileRef = useRef('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'year-start') {
      setYearValue(e.target.value);
      setIsYearErrorDisplayed(() => isInputTextValidate(yearRef.current.value, 3, 4) ? false : true);
    }

    if (e.target.id === 'important') {
      setIsImportantValue(e.target.value);
    }

    if (e.target.id === 'order') {
      setOrderValue(e.target.value);
      setIsOrderErrorDisplayed(() => isInputTextValidate(orderRef.current.value) ? false : true);
    }

    if (e.target.id === 'picto') {
      setPictoValue(e.target.value);
    }

    if (e.target.id === 'title-fr') {
      setTitleFrValue(e.target.value);
      setIsTitleFrErrorDisplayed(() => isInputTextValidate(titleFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'title-en') {
      setTitleEnValue(e.target.value);
      setIsTitleEnErrorDisplayed(() => isInputTextValidate(titleEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'diploma-fr') {
      setDiplomaFrValue(e.target.value);
      setIsDiplomaFrErrorDisplayed(() => isInputTextValidate(diplomaFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'diploma-en') {
      setDiplomaEnValue(e.target.value);
      setIsDiplomaEnErrorDisplayed(() => isInputTextValidate(diplomaEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'school') {
      setSchoolValue(e.target.value);
      setIsSchoolErrorDisplayed(() => isInputTextValidate(schoolRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'file') {
      setFileValue(e.target.value);
      setIsFileErrorDisplayed(() => isInputTextValidate(fileRef.current.value, 3) ? false : true);
    }

    setIsDisabled(() => isInputTextValidate(yearRef.current.value, 3, 4) 
                        && isInputTextValidate(orderRef.current.value)
                        && isInputTextValidate(titleFrRef.current.value, 3) 
                        && isInputTextValidate(titleEnRef.current.value, 3) 
                        && isInputTextValidate(diplomaFrRef.current.value, 3) 
                        && isInputTextValidate(diplomaEnRef.current.value, 3) 
                        && isInputTextValidate(schoolRef.current.value, 3) 
                        && isInputTextValidate(fileRef.current.value, 3) 
                          ? false : true);
  };

  const handleButtonRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImportantValue(e.target.value);
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
    getErrorMessage(dataAction);

    if (data) {
      setYearValue(data.year);
      setIsImportantValue(data.is_important);
      setOrderValue(data.order);
      setPictoValue(data.picto);
      setTitleFrValue(data.title_fr);
      setTitleEnValue(data.title_en);
      setDiplomaFrValue(data.diploma_fr);
      setDiplomaEnValue(data.diploma_en);
      setSchoolValue(data.school);
      setFileValue(data.file);
    }
  }, [])

  useEffect(() => {
    getErrorMessage(dataAction);
    
    dataAction?.isDisplayedSnackBar && setTimeout(() => {
      navigate(dataAction?.redirectionPath);
    }, 3000);
  }, [dataAction])


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

        {/* Champ caché ID */}
        {
          data && (
            <Input id="id" 
                type="hidden" 
                value={data.id}
                inputRef={idRef} />
          )
        }

        {/* Champ ANNEE */}
        <div className="mb-4">
          <label htmlFor="year" 
                  className="label">
            {t('yearStartText')}
          </label>
          <Input id="year" 
                  type="number" 
                  value={yearValue}
                  inputRef={yearRef}
                  autoComplete="year" 
                  isInputErrorDisplayed={isYearErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isYearErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ ORDER */}
        <div className="mb-4">
          <label htmlFor="order" 
                  className="label">
            {t('orderText')}
          </label>
          <Input id="order" 
                  type="number" 
                  value={orderValue}
                  inputRef={orderRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isOrderErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isOrderErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ IMPORTANT */}
        <div className="mb-4">
          <label htmlFor="important" 
                  className="label">
            {t('isImportantText')}
          </label>
          <BinaryRadioButton className="banary-radio-buttons-group"
                              value={isImportantValue}
                              text1={t('noText')}
                              text2={t('yesText')}
                              name="important"
                              id1="important-radio-button-1"
                              id2="important-radio-button-2"
                              onClick={handleButtonRadioClick} />
        </div>
        
        {/* Champ LOGO */}
        <div className="mb-4">
          <label htmlFor="picto" 
                  className="label">
            {t('pictoText')}
          </label>
          <Input id="picto" 
                  type="text" 
                  value={pictoValue}
                  inputRef={pictoRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isPictoErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isPictoErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ TITLE */}
        <div className="mb-4">
          <label htmlFor="title-fr" 
                  className="label">
            {t('titleText')} ({t('inFrText')})
          </label>
          <Input id="title-fr" 
                  type="text" 
                  value={titleFrValue}
                  inputRef={titleFrRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isTitleFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="title-en" 
                  className="label">
            {t('titleText')} ({t('inEnText')})
          </label>
          <Input id="title-en" 
                  type="text" 
                  value={titleEnValue}
                  inputRef={titleEnRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isTitleEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ DIPLOME */}
        <div className="mb-4">
          <label htmlFor="diploma-fr" 
                  className="label">
            {t('diplomaText')} ({t('inFrText')})
          </label>
          <Input id="diploma-fr" 
                  type="text" 
                  value={diplomaFrValue}
                  inputRef={diplomaFrRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isDiplomaFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDiplomaFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="diploma-en" 
                  className="label">
            {t('diplomaText')} ({t('inEnText')})
          </label>
          <Input id="diploma-en" 
                  type="text" 
                  value={diplomaEnValue}
                  inputRef={diplomaEnRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isDiplomaEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDiplomaEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ Ecole */}
        <div className="mb-4">
          <label htmlFor="school" 
                  className="label">
            {t('Text')} ({t('inFrText')})
          </label>
          <Input id="school" 
                  type="text" 
                  value={schoolValue}
                  inputRef={schoolRef}
                  autoComplete="school" 
                  isInputErrorDisplayed={isSchoolErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isSchoolErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ Fichier */}
        <div className="mb-4">
          <label htmlFor="file" 
                  className="label">
            {t('Text')} ({t('inFrText')})
          </label>
          <Input id="file" 
                  type="text" 
                  value={fileValue}
                  inputRef={fileRef}
                  autoComplete="file" 
                  isInputErrorDisplayed={isFileErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isFileErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

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
