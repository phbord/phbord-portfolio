import { Link } from "@remix-run/react";
import { useTranslation } from "react-i18next";


export default function PrevPageLink({url}: string) {
  const { t } = useTranslation();


  return (
    <Link to={url}
          className='btn-prev-page'>
      {t('prevPageText')}
    </Link>
  )
}
