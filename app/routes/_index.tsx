import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';
import { useTranslation } from "react-i18next";

import { getData } from "~/services/getData";
import metaGlobal from "~/assets/data/MetaFunctionGlobal";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};

export async function loader() {
  const options: object = { table: 'Knowledges', orderBy: 'order', ascending: true };
  const data = await getData(options);
  return json(await data);
}


export default function Index() {
  const data = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //console.log('data --->', data);

  return (
    <div className="font-roboto">
      <h1>Welcome to Remix</h1>
      <hr />
      <ul>
        {
          t('header', { returnObjects: true })?.map((item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Iterable<ReactNode> | null | undefined) => (
            <li key={uuidv4()}>
              <div>{item.name}</div>
            </li>
          ))
        }
      </ul>
      <hr />
      <ul>
        {
          data?.map((knowledge: any) => (
            <li key={uuidv4()}>
              <div>{knowledge.title}</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}