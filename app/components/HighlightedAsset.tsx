import { cn } from '~/lib/utils';

import type { Asset } from '~/types';

interface HighlightedAssetProps {
  asset?: Asset;
}

export default function HighlightedAsset({ asset }: HighlightedAssetProps) {
  if (!asset) return null;

  return (
    <div className={cn('w-96 hover:scale-105 ')}>
      <img src={asset.image_url ?? 'todo-placeholder.jpg'} />
    </div>
  );
}
