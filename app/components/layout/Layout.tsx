import { ReactNode } from "react";
import { useMatches } from "@remix-run/react";
import { useTranslation } from 'react-i18next';

import isCompleteLayout from "~/utils/isCompleteLayout";
import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Sidebar from "~/components/layout/Sidebar";


export default function Layout({children}: {children: ReactNode}) {
  const matches = useMatches();
  const pathname = matches[1].pathname;
  const idRoute = matches[1].id;
  const completeLayout: boolean = isCompleteLayout(pathname, idRoute);
  const { t } = useTranslation();
  const mainData = t('header', { returnObjects: true });
  const authData = t('authentification', { returnObjects: true });
  

  return (
    <>
      <Header />
      <main className="main">
        {children}
        <Sidebar mainData={mainData} 
                  authData={authData} />
        { completeLayout &&  <Footer /> }
      </main>
    </>
  )
}