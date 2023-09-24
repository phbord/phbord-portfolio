import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import metaGlobal from "~/utils/functions/MetaFunctionGlobal";


export const meta: MetaFunction = () => {
  return [
    { title: metaGlobal.title },
    { name: "description", content: metaGlobal.description },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Outlet />
    </div>
  );
}