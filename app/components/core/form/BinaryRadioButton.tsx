import { LegacyRef } from "react";


interface BinaryRadioButtonInterface {
  value?: boolean;
  text1: string;
  text2: string;
  name: string;
  id1: string;
  id2: string;
  inputRef1: LegacyRef<HTMLTextAreaElement> | undefined;
  inputRef2: LegacyRef<HTMLTextAreaElement> | undefined;
  className?: string;
  onClick?: () => void;
}

export default function BinaryRadioButton({value=false, text1, text2, name, id1, id2, inputRef1, inputRef2, className, onClick}: BinaryRadioButtonInterface) {
  const isValue1 = value === false ? 'checked' : '';
  const isValue2 = value !== false ? 'checked' : '';

  return (
    <div className={className}>
      {/* Groupe 01 */}
      <div className="flex my-1" onClick={onClick}>
        {
          value === false
            ? (
                <input type="radio" 
                        id={id1} 
                        name={name} 
                        ref={inputRef1} 
                        value="false"
                        defaultChecked />
            )
            : (
              <input type="radio" 
                      id={id1} 
                      name={name} 
                      ref={inputRef1} 
                      value="false" />
            )
          }
        <label htmlFor={id1}>
          {text1}
        </label>
      </div>

      {/* Groupe 02 */}
      <div className="flex my-1" onClick={onClick}>
        {
          value === true
            ? (
              <input type="radio" 
                id={id2} 
                name={name} 
                ref={inputRef2}
                value="true"
                defaultChecked />
            )
            : (
              <input type="radio" 
                id={id2} 
                name={name} 
                ref={inputRef2}
                value="true" />
            )
        }
        <label htmlFor={id2}>
          {text2}
        </label>
      </div>
    </div>
  )
}
