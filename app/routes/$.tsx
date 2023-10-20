import { Link, isRouteErrorResponse, useRouteError } from '@remix-run/react'
import { useTranslation } from "react-i18next";


export default function ErrorBoundary() {
  const { t } = useTranslation();
  const error = useRouteError
  const titleValue = "Page non trouvée"
  const detailsValue = "Désolé, nous n’avons pas trouvé la page que vous recherchez."
  const homeLinkValue = "Retour à l'accueil"

  return (
    <>
      {/* BODY */}
      <section className="container-not-found bg-neutral-200">
        <div className="content-oblique-strategies">
          {
            isRouteErrorResponse(error)
              ? `${error.status} ${error.statusText}`
              : error instanceof Error
                ? error.message
                : (
                  <>
                    {/* Titre */}
                    <h2 className="h2">
                      {t('notFoundText')}
                    </h2>
                    <div className="oblique-strategies-body">
                      <p className='mb-1 text-cyan-900 text-xl'>
                        {t('errorText')} 404
                      </p>
                      <p className='mb-5 text-cyan-900 text-base'>
                        {t('notFoundDescText')}
                      </p>
                      <Link to='/' className='btn-auto'>
                        {homeLinkValue}
                      </Link>
                    </div>
                  </>
                )
          }
        </div>
      </section>
    </>
  )
}
