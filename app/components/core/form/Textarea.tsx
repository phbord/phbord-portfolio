import { JSXElementConstructor, LegacyRef, ReactElement, ReactNode, ReactPortal } from "react";

interface TextareaPasswordInterface {
  value?: string;
  id: string;
  cols?: number | undefined;
  rows?: number | undefined;
  placeholder: string;
  inputRef: LegacyRef<HTMLTextAreaElement> | undefined;
  isInputErrorDisplayed?: boolean;
  onChange?: () => void;
}

export default function Textarea({
  value='', 
  id, 
  cols=30, 
  rows=10, 
  isInputErrorDisplayed, 
  placeholder='', 
  inputRef, 
  onChange
}: TextareaPasswordInterface) {
  return (
    <>
      <textarea defaultValue={value}
                name={id} 
                id={id}
                ref={inputRef}
                cols={cols}
                rows={rows}
                placeholder={placeholder}
                className={`input ${isInputErrorDisplayed ? 'input--error' : ''}`}
                onChange={onChange}></textarea>
    </>
  )
}
