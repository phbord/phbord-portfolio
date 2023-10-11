import { useTranslation } from "react-i18next";
import { SparklesIcon, XCircleIcon } from "@heroicons/react/20/solid";


interface FormMessageInterface {
  data: DataFormMessageInterface;
  isError: boolean;
}

interface DataFormMessageInterface {
  status?: number | string;
  message: string;
}

export default function FormMessage({data, isError=false}: FormMessageInterface) {
  const { t } = useTranslation();

  return (
    <div className={`form-message ${isError ? 'form-message-error' : 'form-message-success'}`}>
      {
        isError
          ? <XCircleIcon className="form-message-icon" />
          : <SparklesIcon className="form-message-icon" />
      }
      <div className="form-message-body">
        {
          data.status && (
            <p className="form-message-status">{t('statusText')} : {data.status}</p>
          )
        }
        <p>{data.message}</p>
      </div>
    </div>
  )
}
