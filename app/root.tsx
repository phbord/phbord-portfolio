import { useEffect, useState } from 'react';
import { ActionFunctionArgs, createCookie, json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useActionData,
} from "@remix-run/react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { createInstance } from "i18next";

import mainData from '~/assets/data/mainData';
import stylesheet from "~/assets/styles/tailwind.css";
import useLangStore from '~/services/store/useLangStore';
import useScrollYPositionStore from '~/services/store/useScrollYPositionStore';
import { getCookie } from '~/services/cookies';
import Transitions from '~/components/layout/Transitions';
import Layout from '~/components/layout/Layout';
import TopPageButton from '~/components/core/buttons/TopPageButton';


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];


export async function action({request}: ActionFunctionArgs) {
  const formData: FormData = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  const sessionCookie = createCookie("sb_session", {
    expires: new Date("1970-01-01"),
  });

  return json({
    isValid: true,
    isDisplayedSnackBar: true,
    message: 'signoutSnackbarText',
    cookieHeader,
  },
  {
    headers: {
      "Set-Cookie": await sessionCookie.serialize(),
    },
  });
}

export default function App() {
  const data = useActionData();
  const { newLang } = useLangStore();
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

  const i18n = createInstance({
    fallbackLng: newLang,
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

  const handleScroll = () => useScrollYPositionStore.getState().setNewScrollYPosition();
  
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
                <TopPageButton />
              </Transitions>
              <ScrollRestoration />
              <Scripts />
              <LiveReload />
              <Scripts />
            </Layout>
          </body>
        </html>
      </I18nextProvider>
    </>
  );
}
