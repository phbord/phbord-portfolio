import { LegacyRef } from "react";

interface InputPasswordInterface {
  type?: string;
  min?: string | number;
  max?: string | number;
  id: string;
  placeholder?: string;
  value?: string;
  inputRef?: LegacyRef<HTMLInputElement> | undefined;
  isInputErrorDisplayed?: boolean;
  onChange?: () => void;
}

export default function Input({
  type='text', 
  min,
  max,
  id, 
  value, 
  isInputErrorDisplayed, 
  placeholder='', 
  inputRef, 
  onChange
}: InputPasswordInterface) {
  const emailPlaceholder = type === 'email' ? 'Ex : chuck@norris.com' : placeholder;

  return (
    <>
      {
        type === 'number' 
          ? (
            <input id={id}
                    name={id}
                    type={type}
                    min={min}
                    max={max}
                    value={value}
                    ref={inputRef}
                    placeholder={emailPlaceholder}
                    className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
                    onChange={onChange} />
          )
          : (
            <input id={id}
                    name={id}
                    type={type}
                    value={value}
                    ref={inputRef}
                    placeholder={emailPlaceholder}
                    className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
                    onChange={onChange} />
          )
      }
    </>
  )
}
