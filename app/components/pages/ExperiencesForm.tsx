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


interface ExperiencesFormInterface {
  className?: string;
  data?: any;
}

export default function ExperiencesForm({className='', data}: ExperiencesFormInterface) {
  const { t } = useTranslation();
  const dataAction = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isMonthStartErrorDisplayed, setIsMonthStartErrorDisplayed] = useState(false);
  const [isYearStartErrorDisplayed, setIsYearStartErrorDisplayed] = useState(false);
  const [isMonthEndErrorDisplayed, setIsMonthEndErrorDisplayed] = useState(false);
  const [isYearEndErrorDisplayed, setIsYearEndErrorDisplayed] = useState(false);
  const [isFirmErrorDisplayed, setIsFirmErrorDisplayed] = useState(false);
  const [isDescriptionErrorDisplayed, setIsDescriptionErrorDisplayed] = useState(false);
  const [isStackErrorDisplayed, setIsStackErrorDisplayed] = useState(false);
  const [isPictoErrorDisplayed, setIsPictoErrorDisplayed] = useState(false);
  const [isListErrorDisplayed, setIsListErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [monthStartValue, setMonthStartValue] = useState('');
  const [yearStartValue, setYearStartValue] = useState('');
  const [monthEndValue, setMonthEndValue] = useState('');
  const [yearEndValue, setYearEndValue] = useState('');
  const [firmValue, setFirmValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [stackValue, setStackValue] = useState('');
  const [pictoValue, setPictoValue] = useState('');
  const [listValue, setListValue] = useState('');
  const idRef = useRef('');
  const monthStartRef = useRef('');
  const yearStartRef = useRef('');
  const monthEndRef = useRef('');
  const yearEndRef = useRef('');
  const firmRef = useRef('');
  const descriptionRef = useRef('');
  const stackRef = useRef('');
  const pictoRef = useRef('');
  const listRef = useRef('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'month-start') {
      setMonthStartValue(e.target.value);
      setIsMonthStartErrorDisplayed(() => isInputTextValidate(monthStartRef.current.value, 0, 2) && isInputNumberValidate(monthStartRef.current.value, 1, 12) ? false : true);
    }

    if (e.target.id === 'year-start') {
      setYearStartValue(e.target.value);
      setIsYearStartErrorDisplayed(() => isInputTextValidate(yearStartRef.current.value, 3, 4) ? false : true);
    }

    if (e.target.id === 'month-end') {
      setMonthEndValue(e.target.value);
    }

    if (e.target.id === 'year-end') {
      setYearEndValue(e.target.value);
    }

    if (e.target.id === 'firm') {
      setFirmValue(e.target.value);
      setIsFirmErrorDisplayed(() => isInputTextValidate(firmRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'picto') {
      setPictoValue(e.target.value);
    }

    if (e.target.id === 'description') {
      setDescriptionValue(e.target.value);
      setIsDescriptionErrorDisplayed(() => isInputTextValidate(descriptionRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'stack') {
      setStackValue(e.target.value);
      setIsStackErrorDisplayed(() => isInputTextValidate(stackRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'list') {
      setListValue(e.target.value);
    }

    setIsDisabled(() => isInputTextValidate(monthStartRef.current.value, 0, 2) 
                        && isInputTextValidate(yearStartRef.current.value, 3, 4) 
                        && isInputTextValidate(firmRef.current.value, 3) 
                        && isInputTextValidate(descriptionRef.current.value, 3) 
                        && isInputTextValidate(stackRef.current.value, 3) 
                          ? false : true);
  };

  const handleButtonRadioClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImportantValue(e.target.value);
    console.log(e.target.value, '**************', e.target.id);
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
        
        <div className="grid grid-cols-2 gap-4">
          {/* Champ MOIS de DEBUT */}
          <div className="mb-4">
            <label htmlFor="month-start" 
                    className="label">
              {t('monthStartText')}
            </label>
            <Input id="month-start" 
                    type="number" 
                    min="1"
                    max="12"
                    value={monthStartValue}
                    inputRef={monthStartRef}
                    autoComplete="month start" 
                    isInputErrorDisplayed={isMonthStartErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isMonthStartErrorDisplayed ? '' : 'hidden'} 
                                message={t('inputTextWrongEntry')} />
          </div>
          
          {/* Champ ANNEE de DEBUT */}
          <div className="mb-4">
            <label htmlFor="year-start" 
                    className="label">
              {t('yearStartText')}
            </label>
            <Input id="year-start" 
                    type="number" 
                    value={yearStartValue}
                    inputRef={yearStartRef}
                    autoComplete="year start" 
                    isInputErrorDisplayed={isYearStartErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isYearStartErrorDisplayed ? '' : 'hidden'} 
                                message={t('inputTextWrongEntry')} />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Champ MOIS de FIN */}
          <div className="mb-4">
            <label htmlFor="month-end" 
                    className="label">
              {t('monthEndText')}
            </label>
            <Input id="month-end" 
                    type="number" 
                    min="1"
                    max="12"
                    value={monthEndValue}
                    inputRef={monthEndRef}
                    autoComplete="month end" 
                    isInputErrorDisplayed={isMonthEndErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isMonthEndErrorDisplayed ? '' : 'hidden'} 
                                message={t('inputTextWrongEntry')} />
          </div>
          
          {/* Champ ANNEE de FIN */}
          <div className="mb-4">
            <label htmlFor="year-end" 
                    className="label">
              {t('yearEndText')}
            </label>
            <Input id="year-end" 
                    type="number" 
                    value={yearEndValue}
                    inputRef={yearEndRef}
                    autoComplete="year end" 
                    isInputErrorDisplayed={isYearEndErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isYearEndErrorDisplayed ? '' : 'hidden'} 
                                message={t('inputTextWrongEntry')} />
          </div>
        </div>
        
        {/* Champ ENTREPRISE */}
        <div className="mb-4">
          <label htmlFor="firm" 
                  className="label">
            {t('firmText')}
          </label>
          <Input id="firm" 
                  type="text" 
                  value={firmValue}
                  inputRef={firmRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isFirmErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isFirmErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
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
        
        {/* Champ DESCRIPTION */}
        <div className="mb-4">
          <label htmlFor="description" 
                  className="label">
            {t('descriptionText')}
          </label>
          <Input id="description" 
                  type="text" 
                  value={descriptionValue}
                  inputRef={descriptionRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isDescriptionErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDescriptionErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Textarea LISTE  */}
        <div className="mb-4">
          <label htmlFor="list" 
                  className="label">
            {t('listText')}
          </label>
          <Textarea id="list"
                    value={listValue}
                    inputRef={listRef}
                    autoComplete="list of projects" 
                    isInputErrorDisplayed={isListErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isListErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ OUTILS */}
        <div className="mb-4">
          <label htmlFor="stack" 
                  className="label">
            {t('stackText')}
          </label>
          <Input id="stack" 
                  type="text" 
                  value={stackValue}
                  inputRef={stackRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isStackErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isStackErrorDisplayed ? '' : 'hidden'} 
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
