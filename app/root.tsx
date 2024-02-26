import { cssBundleHref } from '@remix-run/css-bundle';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { useState } from 'react';

import stylesheet from '~/tailwind.css';
import { cn } from '~/lib/utils';
import DarkModeButton from '~/components/DarkModeButton';

import type { LinksFunction } from '@remix-run/node';
import Navigation from './components/Navigation';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className={cn('flex flex-col min-h-screen', isDark ? 'dark' : '')}>
        <header className="w-screen px-8 md:mx-auto bg-gradient-to-tr from-radix-yellow-7 to-radix-yellow-9 flex flex-col items-center relative border-b-2 border-radix-yellow-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mt-4 text-radix-black">
              <Link to="/">Stickerbook</Link>
            </h1>
          </div>

          <div className="flex">
            <Navigation />
            <DarkModeButton setIsDark={setIsDark} isDark={isDark} />
          </div>
        </header>

        <main className="flex-grow container mt-8 mx-auto flex flex-col items-center p-4">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>

        <footer className="p-4 text-muted text-center">
          <p>Soleone - Open Source.</p>
        </footer>
      </body>
    </html>
  );
}
