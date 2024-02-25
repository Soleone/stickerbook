import { cn } from '~/lib/utils';

import type { Asset } from '~/types';

interface AssetProps {
  asset: Asset;
  isCollected: boolean;
  setHighlightedAsset: (asset: Asset) => void;
}

export default function Asset({ asset, isCollected, setHighlightedAsset }: AssetProps) {
  return (
    <div
      className={cn('w-48 sm:w-36 hover:scale-105', isCollected ? '' : 'opacity-30')}
      onClick={() => setHighlightedAsset(asset)}
    >
      <img src={asset.image_url ?? 'todo-placeholder.jpg'} />
    </div>
  );
}
