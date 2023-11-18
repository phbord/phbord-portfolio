import { FunnelIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "~/components/core/buttons/Button";


interface FiltersInterface {
  onClick: () => void;
  textFilter: string;
  textFilterInverse: string;
  className?: string;
}

export default function Filters({onClick, textFilter, textFilterInverse, className}: FiltersInterface) {
  const { t } = useTranslation();
  const [activeDefaultClass, setActiveDefaultClass] = useState(true);
  const [activeFilterClass, setActiveFilterClass] = useState(false);
  const [activeFilterInverseClass, setActiveFilterInverseClass] = useState(false);

  const handleClick = (e) => {
    onClick(e);
    switch (e.target.id) {
      case 'btn-filter':
        setActiveDefaultClass(false);
        setActiveFilterClass(true);
        setActiveFilterInverseClass(false);
        break;
      case 'btn-filter-inverse':
        setActiveDefaultClass(false);
        setActiveFilterClass(false);
        setActiveFilterInverseClass(true);
        break;
      default:
        setActiveDefaultClass(true);
        setActiveFilterClass(false);
        setActiveFilterInverseClass(false);
        break;
    }
  };


  return (
    <nav className={`filters ${className}`}>
      <FunnelIcon className="fiters-icon" />
      {/* Liste de FILTRES */}
      <ul className="filters-list">
        <li className="filters-item">
          <Button className={activeDefaultClass ? 'filters-button filters-button--active' : 'filters-button'}
                  id='btn-default'
                  onClick={handleClick}>{t('allText')}</Button>
        </li>
        <li className="filters-item">
          <span className="filters-separator">|</span>
          <Button className={activeFilterClass ? 'filters-button filters-button--active' : 'filters-button'}
                  id='btn-filter'
                  onClick={handleClick}>{textFilter}</Button>
          <span className="filters-separator">|</span>
        </li>
        <li className="filters-item">
          <Button className={activeFilterInverseClass ? 'filters-button filters-button--active' : 'filters-button'}
                  id='btn-filter-inverse'
                  onClick={handleClick}>{textFilterInverse}</Button>
        </li>
      </ul>
    </nav>
  )
}
