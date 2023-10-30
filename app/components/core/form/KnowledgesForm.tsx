import { Form, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { isInputTextObjectArrayValidate, isInputTextValidate } from "~/utils/formValidate";
import FormMessage from "~/components/core/form/FormMessage";
import FormElementMessage from "~/components/core/form/FormElementMessage";
import Input from "~/components/core/form/Input";
import Textarea from "~/components/core/form/Textarea";
import Button from "~/components/core/buttons/Button";
import SnackBar from "~/components/core/SnackBar";


interface KnowledgesFormInterface {
  className?: string;
  data: any;
}

export default function KnowledgesForm({className='', data}: KnowledgesFormInterface) {
  const { t } = useTranslation();
  const [dataForm, setDataForm] = useState(data);
  const [isOrderErrorDisplayed, setIsOrderErrorDisplayed] = useState(false);
  const [isTitleFrErrorDisplayed, setIsTitleFrErrorDisplayed] = useState(false);
  const [isTitleEnErrorDisplayed, setIsTitleEnErrorDisplayed] = useState(false);
  const [isIconListErrorDisplayed, setIsIconListErrorDisplayed] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [orderValue, setOrderValue] = useState(data.order);
  const [titleFrValue, setTitleFr] = useState(data.title_fr);
  const [titleEnValue, setTitleEn] = useState(data.title_en);
  const [iconListValue, setIconListValue] = useState(JSON.stringify(data.list));
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


  useEffect(() => {
    console.log('_______', data.list);
  }, [])


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
        
        {/* Champ ORDRE */}
        <div className="mb-4">
          <label htmlFor="order" 
                  className="label">
            {t('orderText')}
          </label>
          <Input id="order" 
                  type="text" 
                  value={orderValue}
                  inputRef={orderRef}
                  autoComplete="email" 
                  isInputErrorDisplayed={isOrderErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isOrderErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
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
                  autoComplete="email" 
                  isInputErrorDisplayed={isTitleFrErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleFrErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
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
                  autoComplete="email" 
                  isInputErrorDisplayed={isTitleEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
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
                    autoComplete="email" 
                    isInputErrorDisplayed={isIconListErrorDisplayed}
                    onChange={handleChange} />
          <FormElementMessage className={isIconListErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
        </div>

        {/* Bouton SUBMIT */}
        <Button disabled={isDisabled || isSubmitting}
                type="submit"
                className="mt-6 btn-submit-form">
          {isSubmitting ? t('submittingText') : t('submitText')}
        </Button>
      </Form>
    </>
  )
}
