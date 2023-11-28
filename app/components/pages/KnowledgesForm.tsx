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
import PrevPageLink from "~/components/core/buttons/PrevPageLink";


interface KnowledgesFormInterface {
  className?: string;
  data?: any;
}

export default function KnowledgesForm({className='', data}: KnowledgesFormInterface) {
  const { t } = useTranslation();
  const dataAction = useActionData();
  const [dataForm, setDataForm] = useState(data);
  const [isOrderErrorDisplayed, setIsOrderErrorDisplayed] = useState(false);
  const [isTitleFrErrorDisplayed, setIsTitleFrErrorDisplayed] = useState(false);
  const [isTitleEnErrorDisplayed, setIsTitleEnErrorDisplayed] = useState(false);
  const [isIconListErrorDisplayed, setIsIconListErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderValue, setOrderValue] = useState('');
  const [titleFrValue, setTitleFr] = useState('');
  const [titleEnValue, setTitleEn] = useState('');
  const [iconListValue, setIconListValue] = useState('');
  const idRef = useRef('');
  const orderRef = useRef('');
  const titleFrRef = useRef('');
  const titleEnRef = useRef('');
  const iconListRef = useRef('');
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'order') {
      setOrderValue(e.target.value);
      setIsOrderErrorDisplayed(() => isInputTextValidate(orderRef.current.value) ? false : true);
    }
    if (e.target.id === 'title-fr') {
      setTitleFr(e.target.value);
      setIsTitleFrErrorDisplayed(() => isInputTextValidate(titleFrRef.current.value, 3) ? false : true);
    }
    if (e.target.id === 'title-en') {
      setTitleEn(e.target.value);
      setIsTitleEnErrorDisplayed(() => isInputTextValidate(titleEnRef.current.value, 3) ? false : true);
    }
    if (e.target.id === 'icon-list') {
      setIconListValue(e.target.value);
      setIsIconListErrorDisplayed(() => isInputTextObjectArrayValidate(iconListRef.current.value, 3) ? false : true);
    }
    
    setIsDisabled(() => isInputTextValidate(orderRef.current.value) 
                        && isInputTextValidate(titleFrRef.current.value, 3) 
                        && isInputTextValidate(titleEnRef.current.value, 3) 
                        && isInputTextObjectArrayValidate(iconListRef.current.value, 3) 
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
      setOrderValue(data.order);
      setTitleFr(data.title_fr);
      setTitleEn(data.title_en);
      setIconListValue(JSON.stringify(data.list));
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
        
        {/* Champ ORDRE */}
        <div className="mb-4">
          <label htmlFor="order" 
                  className="label">
            {t('orderText')}
          </label>
          <Input id="order" 
                  type="number" 
                  value={orderValue}
                  inputRef={orderRef}
                  isInputErrorDisplayed={isOrderErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isOrderErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
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
                  isInputErrorDisplayed={isTitleEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        {/* Textarea LISTE des ICONES */}
        <div className="mb-4">
          <label htmlFor="icon-list" 
                  className="label">
            {t('iconListText')}
          </label>
          <Textarea id="icon-list"
                    value={iconListValue}
                    inputRef={iconListRef}
                    isInputErrorDisplayed={isIconListErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isIconListErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputTextWrongEntry')} />
        </div>

        {/* Lien vers la page précédente */}
        <div className="mt-6 mb-2">
          <PrevPageLink url='/' />
        </div>

        {/* Bouton SUBMIT */}
        <Button disabled={isDisabled || isSubmitting}
                type="submit"
                className="btn-submit-form">
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
