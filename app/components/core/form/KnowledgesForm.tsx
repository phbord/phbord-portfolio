import { Form, useMatches, useNavigate, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const orderRef = useRef('');
  const titleFrRef = useRef('');
  const titleEnRef = useRef('');
  const iconListRef = useRef('');
  const matches = useMatches();
  const pathname = matches[1].pathname;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const navigate = useNavigate();

  const handleChange = () => {};


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
                  value={data.order}
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
                  value={data.title_fr}
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
                  value={data.title_en}
                  inputRef={titleEnRef}
                  autoComplete="email" 
                  isInputErrorDisplayed={isTitleEnErrorDisplayed}
                  onChange={handleChange} />
          <FormElementMessage className={isTitleEnErrorDisplayed ? '' : 'hidden'} 
                              message={t('inputEmailWrongEntry')} />
        </div>

        {/* Champ LISTE des ICONES */}
        <div className="mb-4">
          <label htmlFor="icon-list" 
                  className="label">
            {t('iconListText')}
          </label>
          <Textarea id="icon-list"
                    inputRef={iconListRef}
                    autoComplete="email" 
                    isInputErrorDisplayed={isIconListErrorDisplayed}
                    onChange={handleChange}
                    value={JSON.stringify(data.list)} />
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
