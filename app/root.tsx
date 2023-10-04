import { useEffect, useState } from 'react';
import { type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";

import stylesheet from "~/assets/styles/tailwind.css";
import mainData from '~/assets/data/mainData';
import Transitions from '~/components/layout1/Transitions';
import Layout from '~/components/layout1/Layout';


const i18n = createInstance({
  fallbackLng: 'fr',
  debug: true,
  interpolation: {
    escapeValue: false,
  },
  resources: mainData,
  react: {
    useSuspense: true
  }
});

i18n.use(initReactI18next).init();

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];


export default function App() {
  const [lang, setLang] = useState('');
  const [sidebar, setSidebar] = useState('');

  const setLangToStorage = () => {
    const langStored = localStorage.getItem('lang');
    
    if (!langStored) {
      localStorage.setItem('lang', 'fr');
      return;
    }
    setLang(langStored);
  };

  const setSidebarToStorage = () => {
    const sidebarStored = localStorage.getItem('sidebar_opened');

    if (!sidebarStored) {
      localStorage.setItem('sidebar_opened', 'false');
      return;
    }
    setSidebar(sidebarStored);
  };

  useEffect(() => {
    setLangToStorage();
    setSidebarToStorage();
  }, []);

  useEffect(() => {
    setSidebarToStorage();
  }, [sidebar]);

  return (
    <>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <html lang={lang}>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <Meta />
            <Links />
          </head>
          <body className="body">
            <Layout>
              <Transitions>
                <Outlet />
              </Transitions>
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
            </Layout>
          </body>
        </html>
      </I18nextProvider>
    </>
  );
}
