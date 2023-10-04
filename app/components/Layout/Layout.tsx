import { ReactNode } from "react";
import { useTranslation } from 'react-i18next';

import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


export default function Layout({children}: {children: ReactNode}) {
  const { t } = useTranslation();
  const headerData = t('header', { returnObjects: true });

  return (
    <>
      <Header />
      <main className="main">
        {children}
        <Sidebar data={headerData} />
      </main>
      <Footer />
    </>
  )
}