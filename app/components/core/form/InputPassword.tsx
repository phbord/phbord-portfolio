import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

import Button from "../buttons/Button";


interface InputPasswordInterface {
  id: string;
  autoComplete: string;
  passwordRef: any;
  isPasswordErrorDisplayed: boolean;
  onChange?: () => void;
}

export default function InputPassword({id, isPasswordErrorDisplayed, autoComplete, passwordRef, onChange}: InputPasswordInterface) {
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => isShow === true ? setIsShow(false) : setIsShow(true);

  return (
    <>
      <div className="flex relative">
        <input id={id}
                name={id}
                type={isShow ? 'text' : 'password'}
                ref={passwordRef}
                autoComplete={autoComplete}
                required 
                className={`pr-7 input ${isPasswordErrorDisplayed ? 'input--error' : ''}`}
                onChange={onChange} />
        <Button className="btn-input-eye" 
                onClick={handleClick}>
          {
            isShow
              ? <EyeIcon className="h-5" />
              : <EyeSlashIcon className="h-5" />
          }
        </Button>
      </div>
    </>
  )
}
