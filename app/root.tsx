import type { LinksFunction, MetaFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import tailwindCss from './tailwind.css?url';
import appCss from './app.css?url';

import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '~/lib/initSupabase';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: tailwindCss },
  { rel: 'stylesheet', href: appCss },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SessionContextProvider supabaseClient={supabase}>
          {children}
        </SessionContextProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
