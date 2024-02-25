import { cn } from '~/lib/utils';

import type { Asset } from '~/types';

interface HighlightedAssetProps {
  asset?: Asset;
  setHighlightedAsset: React.Dispatch<React.SetStateAction<Asset | null>>;
}

export default function HighlightedAsset({ asset, setHighlightedAsset }: HighlightedAssetProps) {
  if (!asset) return null;

  return (
    <div className={cn('w-80 md:w-96')} onClick={() => setHighlightedAsset(null)}>
      <img src={asset.image_url ?? 'todo-placeholder.jpg'} />
    </div>
  );
}
