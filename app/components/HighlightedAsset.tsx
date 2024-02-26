import { cn } from '~/lib/utils';
import type { Card } from '~/models/card';

interface HighlightedAssetProps {
  card?: Card;
  setHighlightedAsset: React.Dispatch<React.SetStateAction<Card | null>>;
}

export default function HighlightedAsset({ card, setHighlightedAsset }: HighlightedAssetProps) {
  if (!card) return null;

  return (
    <div className={cn('w-80 md:w-96')} onClick={() => setHighlightedAsset(null)}>
      <img src={card.imageUrl ?? 'todo-placeholder.jpg'} alt={card.name} />
    </div>
  );
}
