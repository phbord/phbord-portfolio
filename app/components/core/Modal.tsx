import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { useFetcher } from "@remix-run/react";
import { useTranslation } from "react-i18next";

import { XCircleIcon } from '@heroicons/react/20/solid';
import Button from "~/components/core/buttons/Button";


interface ModalInterface {
  children: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
  buttonValue: string;
  onDeleteItemClick: () => void;
  onCancelModalClick: () => void;
}

export default function Modal({children, buttonValue, onDeleteItemClick, onCancelModalClick}: ModalInterface) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  return (
    <div className='modal' aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={onCancelModalClick}>
      <div className='modal-body'>
        <Button className='modal-close-btn'
                srOnlyText={t('modalCloseText')}
                onClick={onCancelModalClick}>
          <XCircleIcon className='modal-close-icon' />
        </Button>
        {/* C O N T E N U */}
        {children}

        {/* B O U T O N S */}
        <fetcher.Form method="post" action="/" className='mt-8 flex justify-end'>
            <Button type='button' className='btn-cancel-modal mr-2' onClick={onCancelModalClick}>
              {t('buttonCancelText')}
            </Button>
            <Button type='submit' className='btn-submit-modal' onClick={onDeleteItemClick}>
              {buttonValue}
            </Button>
          </fetcher.Form>
      </div>
    </div>
  )
}
