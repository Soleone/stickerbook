import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';

import stylesheet from '~/tailwind.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
  { rel: 'stylesheet', href: stylesheet },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <body className="flex flex-col min-h-screen">
        <nav className="bg-primary p-4 text-white">
          <div className="container mx-auto flex justify-between">
            <header>
              <h1 className="text-3xl font-bold text-primary-foreground">
                <Link to="/">Stickerbook</Link>
              </h1>
            </header>
            <div className="space-x-4">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </nav>

        <main className="flex-grow container mx-auto flex flex-col items-center p-4">
          <Outlet />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </main>

        <footer className="bg-gray-700 p-4 text-white text-center">
          <p>Soleone - Open Source.</p>
        </footer>
      </body>
    </html>
  );
}
