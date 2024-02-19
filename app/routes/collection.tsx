import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { listAssets } from '~/lib/imx';
import { Asset } from '~/types';

const user = '0xe1cdf3d734d3cf23ad422547759aaf0fb9e49788';

export async function loader() {
  console.log('loader');
  const assets: Asset[] = await listAssets(user);
  console.log(assets);
  return { assets };

  const staticAssets = {
    assets: [
      {
        id: 1,
        name: 'Sticker 1',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Sticker 3',
        image: 'https://via.placeholder.com/150',
      },
    ],
  };
  return staticAssets;
}

export const meta: MetaFunction = () => {
  return [{ title: 'Collection' }, { name: 'description', content: 'Track your collection progress' }];
};

export default function Collection() {
  const { assets } = useLoaderData<typeof loader>();

  return (
    <section>
      <h2 className="text-2xl font-bold">Collection</h2>

      <p>{assets.length} assets</p>
      {assets.map((asset) => (
        <div key={asset.id}>
          <h3>{asset.name}</h3>
        </div>
      ))}
    </section>
  );
}
