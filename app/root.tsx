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
        <header className="md:w-3/5 h-48 md:my-8 px-8 pb-8 md:mx-auto border-1 border-theme-yellow-300 rounded-sm bg-gradient-to-tr from-theme-yellow-400 to-theme-yellow-300 from-75% flex flex-col items-center relative">
          <div className="flex">
            <Navigation />
            <DarkModeButton setIsDark={setIsDark} isDark={isDark} />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground dark:text-background">
              <Link to="/">Stickerbook</Link>
            </h1>
            <p className="text-theme-gray-700 mt-2">Track your collection status and show it off.</p>
          </div>
        </header>

        <main className="flex-grow container mx-auto flex flex-col items-center p-4">
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
