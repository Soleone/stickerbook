import type { MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: 'Stickerbook' }, { name: 'description', content: 'Track your collection progress' }];
};

export default function Home() {
  return (
    <section>
      <h2 className="text-2xl text-foreground font-bold mb-4">Home</h2>

      <Button color="primary">
        <Link to="/collection">Let's go</Link>
      </Button>
    </section>
  );
}
