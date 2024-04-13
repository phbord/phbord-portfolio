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
import useSession from '~/services/store/useSession';
import getData from '~/services/getData';
import Transitions from '~/components/layout/Transitions';
import Layout from '~/components/layout/Layout';
import TopPageButton from '~/components/core/buttons/TopPageButton';


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader() {
  const profilesData = await getData({ table: 'Profile' });

  return json(await {
    profilesData
  });
}

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
  const { newLang }: any = useLangStore();
  const { isSession }: any = useSession();
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
    useSession.getState().setSession();
    /*!isSession && localStorage.removeItem('sb_profile_id');*/
  }, []);

  useEffect(() => {
    setSidebarToStorage();
    useSession.getState().setSession();
  }, [sidebar]);


  return (
    <>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <html lang={lang}>
          <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content="Portofolio de Pierre-Henri Bord, développeur front-end, intégrateur HTML, React, Nextjs, Remix, Vue, Javascript, Typescript" />
            <meta name="robots" content="index, follow" />
            <meta name="keywords" content="pierre-henri bord, développeur, front-end, intégrateur, web, javascript, react, testing, portfolio" />
            <meta name="author" content="Pierre-Henri Bord" />
            <Meta />
            <meta property="og:type" content="Portofolio" />
            <meta property="og:description" content="Portofolio de Pierre-Henri Bord, développeur front-end, intégrateur HTML, React, Nextjs, Remix, Vue, Javascript, Typescript" />
            <meta property="og:url" content="https://www.linkedin.com/in/phbord/" />
            <meta property="og:image" content="/images/ph-profile.webp" />
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
