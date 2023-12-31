import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { SparklesIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

import Button from "~/components/core/buttons/Button";


interface SnackBarInterface {
  children: string | number | boolean | ReactPortal | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined;
  modalClass?: string;
  isSuccess?: boolean;
  isError?: boolean;
  isCloseButton?: boolean;
}

export default function SnackBar({
  children, 
  modalClass='', 
  isSuccess=false, 
  isError=false, 
  isCloseButton=false
}: SnackBarInterface) {
  const [stateClass, setStateClass] = useState('');

  const changeStateClass = () => {
    setStateClass(isSuccess ? 'bg-green-400' : 'bg-orange-600');
  };

  useEffect(() => {
    changeStateClass();
  }, [])

  useEffect(() => {
    changeStateClass();
  }, [isSuccess, isError])

  return (
    <>
      <div className={`snackbar ${modalClass} ${stateClass}`}>
        {/* BOUTON "Fermer" */}
        <div className="flex justify-end mb-2">
          {
            isCloseButton && (
                <Button className="hover:text-orange-500 transition-all">
                  <XCircleIcon className="h-7" />
                </Button>
            )
          }
        </div>

        {/* CONTENU */}
        {
          !isSuccess && !isError && (
            <div className="snackbar-body">
              {children}
            </div>
          )
        }
        {
          isSuccess && !isError && (
            <div className="snackbar-body flex">
              <SparklesIcon className="h-12 mr-4" />
              <div>{children}</div>
            </div>
          )
        }
        {
          !isSuccess && isError && (
            <div className="snackbar-body flex">
              <XMarkIcon className="h-12 mr-4" />
              <div>{children}</div>
            </div>
          )
        }
      </div>
    </>
  )
}
