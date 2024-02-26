import { cn } from '~/lib/utils';

import type { Card } from '~/models/card';

interface CardProps {
  card: Card;
  isCollected: boolean;
  setHighlightedAsset: (card: Card) => void;
}

export default function CardAsset({ card, isCollected, setHighlightedAsset }: CardProps) {
  return (
    <div
      className={cn('w-48 sm:w-36 hover:scale-110 transition transform-gpu', isCollected ? '' : 'opacity-30')}
      onClick={() => setHighlightedAsset(card)}
    >
      <img src={card.imageUrl ?? 'todo-placeholder.jpg'} />
    </div>
  );
}
