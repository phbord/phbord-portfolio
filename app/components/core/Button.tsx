import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal } from "react";


interface ButtonInterfaceProps {
  children: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
  className?: string;
  srOnlyText?: string;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => (void | undefined) | undefined;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
}

export default function Button({ children, className, srOnlyText, type, onClick, onMouseOver, onMouseOut}: ButtonInterfaceProps) {
  return (
    <>
      <button className={className} 
              onClick={(e) => onClick(e)} 
              onMouseOver={onMouseOver} 
              onMouseOut={onMouseOut}
              type={type}>
        {
          srOnlyText
          && srOnlyText !== ''
          && (
            <span className="sr-only">
              {srOnlyText}
            </span>
          )
        }
        {children}
      </button>
    </>
  )
}
