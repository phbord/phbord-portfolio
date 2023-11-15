import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

import useSession from '~/services/store/useSession';
import Button from '~/components/core/buttons/Button';
import Tooltip from "~/components/core/Tooltip";


interface FormButtonGroupInterface {
  idEdit?: string;
  idDelete?: string;
  className?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export default function FormButtonGroup({idEdit, idDelete, className, onEditClick, onDeleteClick}: FormButtonGroupInterface) {
  const { t } = useTranslation();
  const { isSession }: any = useSession();
  const [isEditTooltipOpened, setIsEditTooltipOpened] = useState(false);
  const [isDeleteTooltipOpened, setIsDeleteTooltipOpened] = useState(false);

  const handleEditMouseOver = () => setIsEditTooltipOpened(true);
  const handleEditMouseOut = () => setIsEditTooltipOpened(false);
  const handleDeleteMouseOver = () => setIsDeleteTooltipOpened(true);
  const handleDeleteMouseOut = () => setIsDeleteTooltipOpened(false);


  return (
    <>
      {
        isSession && (
          <div className={`btn-admin-form-group ${className}`}>
            {/* Bouton d'EDITION */}
            <Button id={idEdit}
                    className='relative btn-admin-form btn-admin-form--edit ml-1'
                    type='submit'
                    srOnlyText={`${t('buttonText')} ${t('buttonEditText')}`}
                    onClick={onEditClick}
                    onMouseOver={handleEditMouseOver}
                    onMouseOut={handleEditMouseOut}>
              <PencilIcon className='h-5' />
              {/* TOOLTIPS */}
              {
                isEditTooltipOpened && (
                  <Tooltip name={t('buttonEditText')} 
                            className='tooltips-footer' />
                )
              }
            </Button>

            {/* Bouton de SUPPRESSION */}
            <Button id={idDelete}
                    className='relative btn-admin-form btn-admin-form--delete ml-1'
                    type='submit'
                    srOnlyText={`${t('buttonText')} ${t('buttonDeleteText')}`}
                    onClick={onDeleteClick}
                    onMouseOver={handleDeleteMouseOver}
                    onMouseOut={handleDeleteMouseOut}>
              <TrashIcon className='h-5' />
              {/* TOOLTIPS */}
              {
                isDeleteTooltipOpened && (
                  <Tooltip name={t('buttonDeleteText')} 
                            className='tooltips-footer' />
                )
              }
            </Button>
          </div>
        )
      }
    </>
  )
}
