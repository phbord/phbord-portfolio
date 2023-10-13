import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import anime from "animejs";
import { ChevronUpIcon } from "@heroicons/react/20/solid";

import useScrollYPositionStore from "~/services/store/useScrollYPositionStore";
import Button from "~/components/core/buttons/Button";


export default function TopPageButton() {
  const { t } = useTranslation();
  const { newScrollYPosition }: any = useScrollYPositionStore();
  const [isHidden, setIsHidden] = useState(false);

  const toggleScrollButton = () => {
    if (window.innerHeight === document.documentElement.offsetHeight || newScrollYPosition < 100) {
      setIsHidden(true);
      return;
    }
    setIsHidden(false);
  };

  const handleClick = () => {
    const scrollElement =
      window.document.scrollingElement ||
      window.document.body ||
      window.document.documentElement;
  
    anime({
      targets: scrollElement,
      scrollTop: 0,
      duration: 300,
      easing: "easeInOutQuad",
    });
  };


  useEffect(() => {
    toggleScrollButton();
  }, [])

  useEffect(() => {
    toggleScrollButton();
  }, [newScrollYPosition])


  return (
    <>
      <Button type='button' 
              className={`top-scroll-btn ${isHidden ? 'top-scroll-btn-hidden' : ''}`} 
              onClick={handleClick} 
              srOnlyText={t('topPageText')}>
        <ChevronUpIcon className="top-scroll-icon" />
      </Button>
    </>
  )
}
