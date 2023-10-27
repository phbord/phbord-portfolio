import { useTranslation } from 'react-i18next';
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';

import useSession from '~/services/store/useSession';
import Button from '~/components/core/buttons/Button';


interface FormButtonGroupInterface {
  idEdit?: string;
  idDelete?: string;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
}

export default function FormButtonGroup({idEdit, idDelete, onEditClick, onDeleteClick}: FormButtonGroupInterface) {
  const { t } = useTranslation();
  const { isSession }: any = useSession();

  return (
    <>
      {
        isSession && (
          <div className='btn-admin-form-group'>
            {/* Bouton d'EDITION */}
            <Button id={idEdit}
                    className='btn-admin-form btn-admin-form--edit ml-1'
                    type='submit'
                    srOnlyText={`${t('buttonText')} ${t('buttonEditText')}`}
                    onClick={onEditClick}>
              <PencilIcon className='h-5' />
            </Button>

            {/* Bouton de SUPPRESSION */}
            <Button id={idDelete}
                    className='btn-admin-form btn-admin-form--delete ml-1'
                    type='submit'
                    srOnlyText={`${t('buttonText')} ${t('buttonDeleteText')}`}
                    onClick={onDeleteClick}>
              <TrashIcon className='h-5' />
            </Button>
          </div>
        )
      }
    </>
  )
}
