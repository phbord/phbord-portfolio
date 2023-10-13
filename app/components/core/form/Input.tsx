import { MutableRefObject } from "react";

interface InputPasswordInterface {
  type: string;
  id: string;
  autoComplete: string;
  inputRef: MutableRefObject<string>;
  passwordRef: any;
  isInputErrorDisplayed: boolean;
  onChange?: () => void;
}

export default function Input({type='text', id, isInputErrorDisplayed, autoComplete, inputRef, onChange}: InputPasswordInterface) {
  return (
    <>
      <input id={id}
              name={id}
              type={type}
              ref={inputRef}
              autoComplete={autoComplete}
              required 
              className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
              onChange={onChange} />
    </>
  )
}
