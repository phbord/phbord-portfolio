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
import Layout from "~/components/Layout/Layout";
import Transitions from "~/components/Layout/Transitions";
import mainData from "~/assets/data/mainData";
//changeLanguage("en") dans un useEffect


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
  return (
    <I18nextProvider i18n={i18n} defaultNS={'translation'}>
      <html lang="fr">
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
  );
}
