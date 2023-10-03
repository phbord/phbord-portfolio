import { ReactNode } from "react";
import { useTranslation } from 'react-i18next';

import Header from "~/components/layout/Header";
import Footer from "~/components/layout/Footer";
import Sidebar from "~/components/layout/Sidebar";


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