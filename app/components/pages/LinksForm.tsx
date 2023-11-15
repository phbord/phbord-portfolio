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


interface LinksFormInterface {
  className?: string;
  data?: any;
}

export default function LinksForm({className='', data}: LinksFormInterface) {
  const { t } = useTranslation();
  const dataAction = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isTitleFrErrorDisplayed, setIsTitleFrErrorDisplayed] = useState(false);
  const [isTitleEnErrorDisplayed, setIsTitleEnErrorDisplayed] = useState(false);
  const [isSubtitleErrorDisplayed, setIsSubtitleErrorDisplayed] = useState(false);
  const [isDescriptionFrErrorDisplayed, setIsDescriptionFrErrorDisplayed] = useState(false);
  const [isDescriptionEnErrorDisplayed, setIsDescriptionEnErrorDisplayed] = useState(false);
  const [isUrlErrorDisplayed, setIsUrlErrorDisplayed] = useState(false);
  const [isOrderErrorDisplayed, setIsOrderErrorDisplayed] = useState(false);
  const [isPictoErrorDisplayed, setIsPictoErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [titleFrValue, setTitleFrValue] = useState('');
  const [titleEnValue, setTitleEnValue] = useState('');
  const [subtitleValue, setSubtitleValue] = useState('');
  const [descriptionFrValue, setDescriptionFrValue] = useState('');
  const [descriptionEnValue, setDescriptionEnValue] = useState('');
  const [urlValue, setUrlValue] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [pictoValue, setPictoValue] = useState('');
  const idRef = useRef('');
  const titleFrRef = useRef('');
  const titleEnRef = useRef('');
  const subtitleRef = useRef('');
  const descriptionFrRef = useRef('');
  const descriptionEnRef = useRef('');
  const urlRef = useRef('');
  const orderRef = useRef('');
  const pictoRef = useRef('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'title-fr') {
      setTitleFrValue(e.target.value);
      setIsTitleFrErrorDisplayed(() => isInputTextValidate(titleFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'title-en') {
      setTitleEnValue(e.target.value);
      setIsTitleEnErrorDisplayed(() => isInputTextValidate(titleEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'subtitle') {
      setSubtitleValue(e.target.value);
      setIsSubtitleErrorDisplayed(() => isInputTextValidate(subtitleRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'description-fr') {
      setDescriptionFrValue(e.target.value);
      setIsDescriptionFrErrorDisplayed(() => isInputTextValidate(descriptionFrRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'description-en') {
      setDescriptionEnValue(e.target.value);
      setIsDescriptionEnErrorDisplayed(() => isInputTextValidate(descriptionEnRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'url') {
      setUrlValue(e.target.value);
      setIsUrlErrorDisplayed(() => isInputTextValidate(urlRef.current.value, 3) ? false : true);
    }

    if (e.target.id === 'order') {
      setOrderValue(e.target.value);
      setIsOrderErrorDisplayed(() => isInputTextValidate(orderRef.current.value) ? false : true);
    }

    if (e.target.id === 'picto') {
      setPictoValue(e.target.value);
    }

    setIsDisabled(() => isInputTextValidate(titleFrRef.current.value, 3) 
                        && isInputTextValidate(titleEnRef.current.value, 3)
                        && isInputTextValidate(subtitleRef.current.value, 3) 
                        && isInputTextValidate(descriptionFrRef.current.value, 3) 
                        && isInputTextValidate(descriptionEnRef.current.value, 3) 
                        && isInputTextValidate(urlRef.current.value, 3) 
                        && isInputTextValidate(orderRef.current.value) 
                          ? false : true);
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
      setTitleFrValue(data.title_fr);
      setTitleEnValue(data.title_en);
      setSubtitleValue(data.subtitle);
      setDescriptionFrValue(data.description_fr);
      setDescriptionEnValue(data.description_en);
      setUrlValue(data.url);
      setOrderValue(data.order);
      setPictoValue(data.picto);
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
        
        {/* Champ SUBTITLE */}
        <div className="mb-4">
          <label htmlFor="subtitle" 
                  className="label">
            {t('subtitleText')}
          </label>
          <Input id="subtitle" 
                  type="text" 
                  value={subtitleValue}
                  inputRef={subtitleRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isSubtitleErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isSubtitleErrorDisplayed ? '' : 'hidden'} 
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
                  autoComplete="picto" 
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
                  autoComplete="picto" 
                  isInputErrorDisplayed={isDescriptionEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isDescriptionEnErrorDisplayed ? '' : 'hidden'} 
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
        
        {/* Champ URL */}
        <div className="mb-4">
          <label htmlFor="url" 
                  className="label">
            Url
          </label>
          <Input id="url" 
                  type="text" 
                  value={urlValue}
                  inputRef={urlRef}
                  autoComplete="picto" 
                  isInputErrorDisplayed={isUrlErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isUrlErrorDisplayed ? '' : 'hidden'} 
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
