import { MutableRefObject } from "react";

interface InputPasswordInterface {
  type: string;
  id: string;
  autoComplete: string;
  inputRef: MutableRefObject<string>;
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
              placeholder={type === 'email' && 'Ex : chuck@norris.com'}
              autoComplete={autoComplete}
              required 
              className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
              onChange={onChange} />
    </>
  )
}
