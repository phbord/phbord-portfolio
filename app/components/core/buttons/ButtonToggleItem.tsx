import { ChevronDownIcon } from '@heroicons/react/20/solid'

import Button from '~/components/core/buttons/Button'


interface ButtonToggleItemInterface {
  isItemOpened: boolean;
  onClick: () => void;
}


export default function ButtonToggleItem({isItemOpened, onClick}: ButtonToggleItemInterface) {
  return (
    <Button onClick={onClick}>
      <ChevronDownIcon className={isItemOpened ? 'icon-chevron icon-chevron--opened' : 'icon-chevron'} />
    </Button>
  )
}
