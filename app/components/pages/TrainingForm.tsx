import { Form, useActionData, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInputTextObjectArrayValidate, isInputTextValidate } from "~/utils/formValidate";
import FormMessage from "~/components/core/form/FormMessage";
import FormElementMessage from "~/components/core/form/FormElementMessage";
import Input from "~/components/core/form/Input";
import Textarea from "~/components/core/form/Textarea";
import Button from "~/components/core/buttons/Button";
import SnackBar from "~/components/core/SnackBar";
import BinaryRadioButton from "~/components/core/form/BinaryRadioButton";
import PrevPageLink from "~/components/core/buttons/PrevPageLink";


interface TrainingFormInterface {
  className?: string;
  data?: any;
}

export default function TrainingForm({className='', data}: TrainingFormInterface) {
  const { t } = useTranslation();
  const dataAction = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isDateStartErrorDisplayed, setIsDateStartErrorDisplayed] = useState(false);
  const [isDateEndErrorDisplayed, setIsDateEndErrorDisplayed] = useState(false);
  const [isTitleFrErrorDisplayed, setIsTitleFrErrorDisplayed] = useState(false);
  const [isTitleEnErrorDisplayed, setIsTitleEnErrorDisplayed] = useState(false);
  const [isDurationFrErrorDisplayed, setIsDurationFrErrorDisplayed] = useState(false);
  const [isDurationEnErrorDisplayed, setIsDurationEnErrorDisplayed] = useState(false);
  const [isSchoolErrorDisplayed, setIsSchoolErrorDisplayed] = useState(false);
  const [isPictoErrorDisplayed, setIsPictoErrorDisplayed] = useState(false);
  const [isProjectsListFrErrorDisplayed, setIsProjectsListFrErrorDisplayed] = useState(false);
  const [isProjectsListEnErrorDisplayed, setIsProjectsListEnErrorDisplayed] = useState(false);
  const [isIsImportantErrorDisplayed, setIsIsImportantErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [dateStartValue, setDateStartValue] = useState('');
  const [dateEndValue, setDateEndValue] = useState('');
  const [titleFrValue, setTitleFrValue] = useState('');
  const [titleEnValue, setTitleEnValue] = useState('');
  const [durationFrValue, setDurationFrValue] = useState('');
  const [durationEnValue, setDurationEnValue] = useState('');
  const [schoolValue, setSchoolValue] = useState('');
  const [pictoValue, setPictoValue] = useState('');
  const [projectsListFrValue, setProjectsListFrValue] = useState('');
  const [projectsListEnValue, setProjectsListEnValue] = useState('');
  const [isImportantValue, setIsImportantValue] = useState('');
  const idRef = useRef('');
  const dateStartRef = useRef('');
  const dateEndRef = useRef('');
  const titleFrRef = useRef('');
  const titleEnRef = useRef('');
  const durationFrRef = useRef('');
  const durationEnRef = useRef('');
  const schoolRef = useRef('');
  const pictoRef = useRef('');
  const projectsListFrRef = useRef('');
  const projectsListEnRef = useRef('');
  const isImportantRef = useRef('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'date-start') {
      setDateStartValue(e.target.value);
      setIsDateStartErrorDisplayed(() => isInputTextValidate(dateStartRef.current.value, 3, 4) ? false : true);
    }

    if (e.target.id === 'date-end') {
      setDateEndValue(e.target.value);
      setIsDateEndErrorDisplayed(() => isInputTextValidate(dateEndRef.current.value, 3, 4) ? false : true);
    }

    if (e.target.id === 'title-fr') {
      setTitleFrValue(e.target.value);
      setIsTitleFrErrorDisplayed(() => isInputTextValidate(titleFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'title-en') {
      setTitleEnValue(e.target.value);
      setIsTitleEnErrorDisplayed(() => isInputTextValidate(titleEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'duration-fr') {
      setDurationFrValue(e.target.value);
      setIsDurationFrErrorDisplayed(() => isInputTextValidate(durationFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'duration-en') {
      setDurationEnValue(e.target.value);
      setIsDurationEnErrorDisplayed(() => isInputTextValidate(durationEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'school') {
      setSchoolValue(e.target.value);
      setIsSchoolErrorDisplayed(() => isInputTextValidate(schoolRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'picto') {
      setPictoValue(e.target.value);
      setIsPictoErrorDisplayed(() => isInputTextValidate(pictoRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'important') {
      setIsImportantValue(e.target.value);
    }

    if (e.target.id === 'projects-list-fr') {
      setProjectsListFrValue(e.target.value);
    }

    if (e.target.id === 'projects-list-en') {
      setProjectsListEnValue(e.target.value);
    }

    setIsDisabled(() => isInputTextValidate(dateStartRef.current.value, 3, 4) 
                        && isInputTextValidate(titleFrRef.current.value, 3) 
                        && isInputTextValidate(titleEnRef.current.value, 3) 
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
      setDateStartValue(data.year_start);
      setDateEndValue(data.year_end);
      setTitleFrValue(data.title_fr);
      setTitleEnValue(data.title_en);
      setDurationFrValue(data.duration_fr);
      setDurationEnValue(data.duration_en);
      setSchoolValue(data.school);
      setPictoValue(data.picto);
      setProjectsListFrValue(JSON.stringify(data.projects_fr));
      setProjectsListEnValue(JSON.stringify(data.projects_en));
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
          {/* Champ DATE de DEBUT */}
          <div className="mb-4">
            <label htmlFor="date-start" 
                    className="label">
              {t('dateStartText')}
            </label>
            <Input id="date-start" 
                    type="number" 
                    value={dateStartValue}
                    inputRef={dateStartRef}
                    autoComplete="date start" 
                    isInputErrorDisplayed={isDateStartErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isDateStartErrorDisplayed ? '' : 'hidden'} 
                                message={t('inputTextWrongEntry')} />
          </div>
          
          {/* Champ DATE de FIN */}
          <div className="mb-4">
            <label htmlFor="date-end" 
                    className="label">
              {t('dateEndText')}
            </label>
            <Input id="date-end" 
                    type="number" 
                    value={dateEndValue}
                    inputRef={dateEndRef}
                    autoComplete="date end" 
                    isInputErrorDisplayed={isDateEndErrorDisplayed}
                    onChange={handleChange} />
            <FormElementMessage className={isDateEndErrorDisplayed ? '' : 'hidden'} 
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
        
        {/* Champ TITRE (français) */}
        <div className="mb-4">
          <label htmlFor="title-fr" 
                  className="label">
            {t('titleFrText')}
          </label>
          <Input id="title-fr" 
                  type="text" 
                  value={titleFrValue}
                  inputRef={titleFrRef}
                  autoComplete="title french" 
                  isInputErrorDisplayed={isTitleFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ TITRE (anglais) */}
        <div className="mb-4">
          <label htmlFor="title-en" 
                  className="label">
            {t('titleEnText')}
          </label>
          <Input id="title-en" 
                  type="text" 
                  value={titleEnValue}
                  inputRef={titleEnRef}
                  autoComplete="title english" 
                  isInputErrorDisplayed={isTitleEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ DUREE (français) */}
        <div className="mb-4">
          <label htmlFor="duration-fr" 
                  className="label">
            {t('durationText')} ({t('inFrText')})
          </label>
          <Input id="duration-fr" 
                  type="text" 
                  value={durationFrValue}
                  inputRef={durationFrRef}
                  autoComplete="duration french" 
                  isInputErrorDisplayed={isDurationFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDurationFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ DUREE (anglais) */}
        <div className="mb-4">
          <label htmlFor="duration-en" 
                  className="label">
            {t('durationText')} ({t('inEnText')})
          </label>
          <Input id="duration-en" 
                  type="text" 
                  value={durationEnValue}
                  inputRef={durationEnRef}
                  autoComplete="duration english" 
                  isInputErrorDisplayed={isDurationEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDurationEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>
        
        {/* Champ CENTRE de FORMATION */}
        <div className="mb-4">
          <label htmlFor="school" 
                  className="label">
            {t('schoolText')}
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
        
        {/* Textarea LISTE des PROJETS */}
        <div className="mb-4">
          <label htmlFor="projects-list-fr" 
                  className="label">
            {t('iconListText')} ({t('inFrText')})
          </label>
          <Textarea id="projects-list-fr"
                    value={projectsListFrValue}
                    inputRef={projectsListFrRef}
                    autoComplete="list of projects" 
                    isInputErrorDisplayed={isProjectsListFrErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isProjectsListFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        <div className="mb-4">
          <label htmlFor="projects-list-en" 
                  className="label">
            {t('iconListText')} ({t('inEnText')})
          </label>
          <Textarea id="projects-list-en"
                    value={projectsListEnValue}
                    inputRef={projectsListEnRef}
                    autoComplete="list of projects" 
                    isInputErrorDisplayed={isProjectsListEnErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isProjectsListEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        {/* Lien vers la page précédente */}
        <div className="mt-10 mb-[-1rem]">
          <PrevPageLink url='/training' />
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
