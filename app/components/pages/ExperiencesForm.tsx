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
  const [isFirmFrErrorDisplayed, setIsFirmFrErrorDisplayed] = useState(false);
  const [isFirmEnErrorDisplayed, setIsFirmEnErrorDisplayed] = useState(false);
  const [isDescriptionFrErrorDisplayed, setIsDescriptionFrErrorDisplayed] = useState(false);
  const [isDescriptionEnErrorDisplayed, setIsDescriptionEnErrorDisplayed] = useState(false);
  const [isStackErrorDisplayed, setIsStackErrorDisplayed] = useState(false);
  const [isEsnFrErrorDisplayed, setIsEsnFrErrorDisplayed] = useState(false);
  const [isEsnEnErrorDisplayed, setIsEsnEnErrorDisplayed] = useState(false);
  const [isPictoErrorDisplayed, setIsPictoErrorDisplayed] = useState(false);
  const [isListFrErrorDisplayed, setIsListFrErrorDisplayed] = useState(false);
  const [isListEnErrorDisplayed, setIsListEnErrorDisplayed] = useState(false);
  const [isIsImportantErrorDisplayed, setIsIsImportantErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [monthStartValue, setMonthStartValue] = useState('');
  const [yearStartValue, setYearStartValue] = useState('');
  const [monthEndValue, setMonthEndValue] = useState('');
  const [yearEndValue, setYearEndValue] = useState('');
  const [firmFrValue, setFirmFrValue] = useState('');
  const [firmEnValue, setFirmEnValue] = useState('');
  const [descriptionFrValue, setDescriptionFrValue] = useState('');
  const [descriptionEnValue, setDescriptionEnValue] = useState('');
  const [stackValue, setStackValue] = useState('');
  const [esnFrValue, setEsnFrValue] = useState('');
  const [esnEnValue, setEsnEnValue] = useState('');
  const [pictoValue, setPictoValue] = useState('');
  const [listFrValue, setListFrValue] = useState('');
  const [listEnValue, setListEnValue] = useState('');
  const [isImportantValue, setIsImportantValue] = useState('');
  const idRef = useRef('');
  const monthStartRef = useRef('');
  const yearStartRef = useRef('');
  const monthEndRef = useRef('');
  const yearEndRef = useRef('');
  const firmFrRef = useRef('');
  const firmEnRef = useRef('');
  const descriptionFrRef = useRef('');
  const descriptionEnRef = useRef('');
  const stackRef = useRef('');
  const esnFrRef = useRef('');
  const esnEnRef = useRef('');
  const pictoRef = useRef('');
  const listFrRef = useRef('');
  const listEnRef = useRef('');
  const isImportantRef = useRef('');
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

    if (e.target.id === 'firm-fr') {
      setFirmFrValue(e.target.value);
      setIsFirmFrErrorDisplayed(() => isInputTextValidate(firmFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'firm-en') {
      setFirmEnValue(e.target.value);
      setIsFirmEnErrorDisplayed(() => isInputTextValidate(firmEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'picto') {
      setPictoValue(e.target.value);
    }

    if (e.target.id === 'description-fr') {
      setDescriptionFrValue(e.target.value);
      setIsDescriptionFrErrorDisplayed(() => isInputTextValidate(descriptionFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'description-en') {
      setDescriptionEnValue(e.target.value);
      setIsDescriptionEnErrorDisplayed(() => isInputTextValidate(descriptionEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'stack') {
      setStackValue(e.target.value);
    }

    if (e.target.id === 'esn-fr') {
      setEsnFrValue(e.target.value);
      setIsEsnFrErrorDisplayed(() => isInputTextValidate(esnFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'esn-en') {
      setEsnEnValue(e.target.value);
      setIsEsnEnErrorDisplayed(() => isInputTextValidate(esnEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'list-fr') {
      setListFrValue(e.target.value);
    }

    if (e.target.id === 'list-en') {
      setListEnValue(e.target.value);
    }

    if (e.target.id === 'important') {
      setIsImportantValue(e.target.value);
    }

    setIsDisabled(() => isInputTextValidate(monthStartRef.current.value, 0, 2) 
                        && isInputTextValidate(yearStartRef.current.value, 3, 4) 
                        && isInputTextValidate(firmFrRef.current.value, 3) 
                        && isInputTextValidate(firmEnRef.current.value, 3) 
                        && isInputTextValidate(descriptionFrRef.current.value, 3) 
                        && isInputTextValidate(descriptionEnRef.current.value, 3) 
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
      setMonthStartValue(data.month_start);
      setYearStartValue(data.year_start);
      setMonthEndValue(data.month_end);
      setYearEndValue(data.year_end);
      setFirmFrValue(data.firm_fr);
      setFirmEnValue(data.firm_en);
      setDescriptionFrValue(data.description_fr);
      setDescriptionEnValue(data.description_en);
      setStackValue(data.stack);
      setEsnFrValue(data.esn_fr);
      setEsnEnValue(data.esn_en);
      setPictoValue(data.picto);
      setListFrValue(JSON.stringify(data.list_fr));
      setListEnValue(JSON.stringify(data.list_en));
      setIsImportantValue(data.is_important);
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
        
        {/* Champ ENTREPRISE */}
        <div className="mb-4">
          <label htmlFor="firm-fr" 
                  className="label">
            {t('firmText')} ({t('inFrText')})
          </label>
          <Input id="firm-fr" 
                  type="text" 
                  value={firmFrValue}
                  inputRef={firmFrRef}
                  autoComplete="firm" 
                  isInputErrorDisplayed={isFirmFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isFirmFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="firm-en" 
                  className="label">
            {t('firmText')} ({t('inEnText')})
          </label>
          <Input id="firm-en" 
                  type="text" 
                  value={firmEnValue}
                  inputRef={firmEnRef}
                  autoComplete="firm" 
                  isInputErrorDisplayed={isFirmEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isFirmEnErrorDisplayed ? '' : 'hidden'} 
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
        
        {/* Champ ESN */}
        <div className="mb-4">
          <label htmlFor="esn-fr" 
                  className="label">
            {t('esnText')} ({t('inFrText')})
          </label>
          <Input id="esn-fr" 
                  type="text" 
                  value={esnFrValue}
                  inputRef={esnFrRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isEsnFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isEsnFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="esn-en" 
                  className="label">
            {t('esnText')} ({t('inEnText')})
          </label>
          <Input id="esn-en" 
                  type="text" 
                  value={esnEnValue}
                  inputRef={esnEnRef}
                  autoComplete="esn" 
                  isInputErrorDisplayed={isEsnEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isEsnEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ DESCRIPTION */}
        <div className="mb-4">
          <label htmlFor="description-fr" 
                  className="label">
            {t('descriptionText')} ({t('inFrText')})
          </label>
          <Input id="description-fr" 
                  type="text" 
                  value={descriptionFrValue}
                  inputRef={descriptionFrRef}
                  autoComplete="description" 
                  isInputErrorDisplayed={isDescriptionFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDescriptionFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="description-en" 
                  className="label">
            {t('descriptionText')} ({t('inEnText')})
          </label>
          <Input id="description-en" 
                  type="text" 
                  value={descriptionEnValue}
                  inputRef={descriptionEnRef}
                  autoComplete="description" 
                  isInputErrorDisplayed={isDescriptionEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDescriptionEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Textarea LISTE  */}
        <div className="mb-4">
          <label htmlFor="list-fr" 
                  className="label">
            {t('listText')} ({t('inFrText')})
          </label>
          <Textarea id="list-fr"
                    value={listFrValue}
                    inputRef={listFrRef}
                    autoComplete="list of projects" 
                    isInputErrorDisplayed={isListFrErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isListFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="list-en" 
                  className="label">
            {t('listText')} ({t('inEnText')})
          </label>
          <Textarea id="list-en"
                    value={listEnValue}
                    inputRef={listEnRef}
                    autoComplete="list of projects" 
                    isInputErrorDisplayed={isListEnErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isListEnErrorDisplayed ? '' : 'hidden'} 
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
