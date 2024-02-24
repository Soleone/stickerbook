import type { LoaderFunction, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import Asset from '~/components/Asset';
import HighlightedAsset from '~/components/HighlightedAsset';
import { listAssets } from '~/lib/imx';
import { cn } from '~/lib/utils';
import { Asset as AssetType } from '~/types';

const DEFAULT_ADDRESS = '0xe1cdf3d734d3cf23ad422547759aaf0fb9e49788';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const address = url.searchParams.get('address');

  const assets: AssetType[] = await listAssets(address ?? DEFAULT_ADDRESS);
  return { assets };
};

export const meta: MetaFunction = () => {
  return [{ title: 'Collection' }, { name: 'description', content: 'Track your collection progress' }];
};

export default function Collection() {
  const [highlightedAsset, setHighlightedAsset] = useState<AssetType | null>(null);
  const { assets } = useLoaderData<typeof loader>();

  return (
    <section>
      <p>{assets.length} assets</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {assets.map((asset) => (
          <Asset key={asset.id} asset={asset} isCollected={true} setHighlightedAsset={setHighlightedAsset} />
        ))}
      </div>
      <div
        className={cn(
          'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-lg z-10 transition-all duration-300 ease-in-out',
          highlightedAsset ? 'visible' : 'invisible',
        )}
      >
        {highlightedAsset && <HighlightedAsset asset={highlightedAsset} />}
      </div>
    </section>
  );
}
