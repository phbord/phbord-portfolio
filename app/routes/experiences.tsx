import type { MetaFunction } from "@remix-run/node";

import metaGlobal from "~/assets/data/MetaFunctionGlobal";

export const meta: MetaFunction = () => {
  return [
    { title: `${metaGlobal.title} - Expériences` },
    { name: "description", content: metaGlobal.description },
  ];
};

export default function Experiences() {
  return (
    <div>experiences</div>
  )
}
