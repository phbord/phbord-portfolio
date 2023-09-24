import { json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/assets/styles/tailwind.css";
import Layout from "~/components/Layout/Layout";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader() {
  return json({
    ENV: {
      DATABASE_URL: process.env.DATABASE_URL,
    },
  });
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  console.log(data.ENV.DATABASE_URL)
  
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          {data.ENV.DATABASE_URL}
          <Outlet />
          <ScrollRestoration />
          <script dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }} />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}
