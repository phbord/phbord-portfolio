import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';

import useSession from '~/services/store/useSession';
import Button from '~/components/core/buttons/Button';


interface FormButtonGroupInterface {
  onNewClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export default function FormButtonGroup({onNewClick, onEditClick, onDeleteClick}: FormButtonGroupInterface) {
  const { t } = useTranslation();
  const { isSession }: any = useSession();

  return (
    <>
      {
        isSession && (
          <div className='btn-admin-form-group'>
            {/* 01. Bouton de CREATION */}
            <Button className='btn-admin-form btn-admin-form--new'
                    srOnlyText={`${t('buttonText')} ${t('buttonNewText')}`}
                    onClick={onNewClick} >
              <PlusIcon className='h-5' />
            </Button>

            {/* 02. Bouton d'EDITION */}
            <Button className='btn-admin-form btn-admin-form--edit ml-1'
                    srOnlyText={`${t('buttonText')} ${t('buttonEditText')}`}
                    onClick={onEditClick} >
              <PencilIcon className='h-5' />
            </Button>
            
            {/* 03. Bouton de SUPPRESSION */}
            <Button className='btn-admin-form btn-admin-form--delete ml-1'
                    srOnlyText={`${t('buttonText')} ${t('buttonDeleteText')}`}
                    onClick={onDeleteClick} >
              <TrashIcon className='h-5' />
            </Button>
          </div>
        )
      }
    </>
  )
}
