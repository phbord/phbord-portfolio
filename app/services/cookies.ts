import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const sbSession = (token?: string) => createCookie("sb_session", {
  secrets: [token],
  expires: new Date(Date.now() + 60000),
  maxAge: 8*3600,
  sameSite: true,
  secure: true,
});

export const getCookie = (name?: string): string => {
  let cookie: any = {};
  document.cookie.split(';').forEach(function(el) {
    let [k,v] = el.split('=');
    cookie[k.trim()] = v;
  })
  return cookie[name];
}

export const isSbSession = (): boolean => {
  if (getCookie('sb_session')) {
    return true;
  }
  return false;
}

export const removeCookie = (name: string) => document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;