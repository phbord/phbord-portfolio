import { ReactNode } from "react";

import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";


export default function Layout({children}: {children: ReactNode}) {
  return (
    <>
      <Header />
      <main className="">
        {children}
      </main>
      <Footer />
    </>
  )
}