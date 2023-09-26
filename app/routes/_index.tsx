import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { v4 as uuidv4 } from 'uuid';

import { getData } from "~/services/getData";
import metaGlobal from "~/assets/data/MetaFunctionGlobal";


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
  console.log('data --->', data);

  return (
    <div className="font-roboto">
      <h1>Welcome to Remix</h1>
      <ul>
        {
          data && data.map((knowledge: any) => (
            <li key={uuidv4()}>
              <div>{knowledge.title}</div>
            </li>
          ))
        }
      </ul>
    </div>
  );
}