import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: 'Stickerbook' }, { name: 'description', content: 'Track your collection progress' }];
};

export default function Home() {
  return (
    <section className="text-center">
      <p className="mb-4">Enter your address to get started.</p>

      <div className="flex gap-4 justify-center">
        <Button variant="default">
          <Link to="/collection">Let's go</Link>
        </Button>

        <Button variant="secondary">
          <Link to="/collection">Abort</Link>
        </Button>

        <Button variant="outline">
          <Link to="/collection">Abort</Link>
        </Button>

        <Button variant="destructive">
          <Link to="/collection">Abort</Link>
        </Button>

        <Button variant="ghost">
          <Link to="/collection">Abort</Link>
        </Button>

        <Button variant="link">
          <Link to="/collection">Abort</Link>
        </Button>
      </div>
    </section>
  );
}
