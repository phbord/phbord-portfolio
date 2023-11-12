import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Button from '~/components/core/buttons/Button';
import Tooltip from '~/components/core/Tooltip';


interface ButtonToggleItemInterface {
  isItemOpened: boolean;
  onClick: () => void;
}


export default function ButtonToggleItem({isItemOpened, onClick}: ButtonToggleItemInterface) {
  const { t } = useTranslation();
  const [isNewTooltipOpened, setIsNewTooltipOpened] = useState(false);

  const handleNewMouseOver = () => setIsNewTooltipOpened(true);
  const handleNewMouseOut = () => setIsNewTooltipOpened(false);


  return (
    <Button onClick={onClick} 
            srOnlyText={t('toggleItemButtonText')}
            className='relative btn-admin-form btn-admin-form--new ml-1'
            onMouseOver={handleNewMouseOver}
            onMouseOut={handleNewMouseOut}>
      <ChevronDownIcon className={isItemOpened ? 'icon-chevron icon-chevron--opened' : 'icon-chevron'} />
      {/* TOOLTIPS */}
      {
        isNewTooltipOpened && (
          <Tooltip name={t('buttonToggleText')} 
                    className='tooltips-footer' />
        )
      }
    </Button>
  )
}
