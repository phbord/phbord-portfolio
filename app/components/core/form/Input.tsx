import { LegacyRef } from "react";

interface InputPasswordInterface {
  type: string;
  id: string;
  placeholder?: string;
  autoComplete?: string;
  value?: string;
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  isInputErrorDisplayed?: boolean;
  onChange?: () => void;
}

export default function Input({
  type='text', 
  id, 
  value, 
  isInputErrorDisplayed, 
  placeholder='', 
  autoComplete, 
  inputRef, 
  onChange
}: InputPasswordInterface) {
  const emailPlaceholder = type === 'email' ? 'Ex : chuck@norris.com' : placeholder;

  return (
    <>
      <input id={id}
              name={id}
              type={type}
              value={value}
              ref={inputRef}
              placeholder={emailPlaceholder}
              autoComplete={autoComplete}
              required 
              className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
              onChange={onChange} />
    </>
  )
}
