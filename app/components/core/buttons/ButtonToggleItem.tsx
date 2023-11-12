import { useTranslation } from 'react-i18next';
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import Button from '~/components/core/buttons/Button'


interface ButtonToggleItemInterface {
  isItemOpened: boolean;
  onClick: () => void;
}


export default function ButtonToggleItem({isItemOpened, onClick}: ButtonToggleItemInterface) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} 
            srOnlyText={t('toggleItemButtonText')}
            className='btn-admin-form btn-admin-form--new ml-1'>
      <ChevronDownIcon className={isItemOpened ? 'icon-chevron icon-chevron--opened' : 'icon-chevron'} />
    </Button>
  )
}
