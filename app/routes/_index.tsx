import type { MetaFunction } from '@remix-run/node';

import { Button } from '~/components/ui/button';

export const meta: MetaFunction = () => {
  return [{ title: 'TODO: Your app title' }, { name: 'description', content: 'TODO: Your app description' }];
};

export default function Index() {
  return (
    <section>
      <h2>TODO: Your page title</h2>

      <Button>Let's go</Button>
    </section>
  );
}
