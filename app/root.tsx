import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  json, useLoaderData, useRouteLoaderData,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { Toaster } from "./components/ui/sonner";
import i18nServer, { localeCookie } from "./modules/i18n.server";
import { useTranslation, } from "react-i18next";
import { useChangeLanguage } from "remix-i18next/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp } from "@clerk/remix";

export const handle = { i18n: ["translation"] }

export const loader = async (args: LoaderFunctionArgs) => {
  return rootAuthLoader(args)
};

export const action = async (args: ActionFunctionArgs) => {
  let locale = await i18nServer.getLocale(args.request);

  return json(
    {
      locale,
    },
    { headers: { "Set-Cookie": await localeCookie.serialize(locale) } }
  );
};



// export let handle = {
// In the handle export, we can add a i18n key with namespaces our route
// will need to load. This key can be a single string or an array of strings.
// TIP: In most cases, you should set this to your defaultNS from your i18n config
// or if you did not set one, set it to the i18next default namespace "translation"
// i18n: "common",
// };


export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");

  const lang = loaderData?.locale ?? "en"

  const { i18n } = useTranslation();
  return (
    <html lang={lang} className="h-screen">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {children}
        <Toaster richColors />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}


export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return <div>
      <h1>Oops!</h1>
      <p>
        {error.status} {error.data}
      </p>
    </div>
  }
  return <div>
    <h1>Something went wrong</h1>
    <pre>{JSON.stringify(error, null, 2)}</pre>
  </div>
}


export default ClerkApp(App);

