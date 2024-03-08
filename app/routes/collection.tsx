import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import CardAsset from '~/components/CardAsset';
import HighlightedAsset from '~/components/HighlightedAsset';
import { cn } from '~/lib/utils';
import { Collection as GuCollection, collectionSetLabels } from '~/lib/gods_unchained';
import type { Card } from '~/models/card';
import { Checkbox } from '~/components/ui/checkbox';

const DEFAULT_ADDRESS = '0xe1cdf3d734d3cf23ad422547759aaf0fb9e49788';

const saveCachedCards = (cards: Card[]) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

const loadCachedCards = (): Card[] => {
  const cards = localStorage.getItem('cards');
  if (cards) {
    return JSON.parse(cards);
  }
  return [];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const address = url.searchParams.get('address');
  const reload = url.searchParams.has('reload');
  const referrer = request.headers.get('Referer');
  const referrerUrl = new URL(referrer ?? 'https://localhost:3000/');
  console.log(`Referrer: ${referrer}`);
  const shouldReload = referrerUrl.searchParams.has('reload');
  if (reload) {
    return redirect(url.pathname);
  }

  let cards: Card[] = [];
  if (shouldReload) {
    const collection = new GuCollection(address ?? DEFAULT_ADDRESS);
    await collection.load();
    cards = collection.cardsByQuality(4);
  }
  return { cards };
};

export const meta: MetaFunction = () => {
  return [{ title: 'Collection' }, { name: 'description', content: 'Track your collection progress' }];
};

export default function Collection() {
  const [highlightedAsset, setHighlightedAsset] = useState<Card | null>(null);
  const loadedCards = useLoaderData<typeof loader>().cards;
  const [cards, setCards] = useState<Card[]>([]);
  const [collectionSetFilter, setCollectionSetFilter] = useState<string>('');
  const [ownedFilter, setOwnedFilter] = useState<boolean>(true);

  useEffect(() => {
    if (loadedCards.length > 0) {
      saveCachedCards(loadedCards)
    } else {
      const cachedCards = loadCachedCards();
      setCards(cachedCards);
    }
  }, [loadedCards]);

  return (
    <section className='flex flex-col md:flex-row'>
      <section className='flex flex-col p-4 max-h-96 rounded-md mr-4 gap-2'>
        <div className="flex items-center space-x-2 w-48">
          <Checkbox
            id="owned"
            checked={ownedFilter}
            onCheckedChange={(checked) => setOwnedFilter(owned => !owned)}
          />
          <label htmlFor="owned"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
          >Owned
          </label>
        </div>

        <h2>Filter by set</h2>
        {Object.entries(collectionSetLabels).map(([collectionSetId, label]) => (
          <div key={collectionSetId} className="flex items-center space-x-2 w-48">
            <Checkbox
              id={collectionSetId}
              checked={collectionSetFilter.includes(collectionSetId)}
              onCheckedChange={(checked) => {
                setCollectionSetFilter((currentFilters) => {
                  if (checked) {
                    return `${currentFilters},${collectionSetId}`;
                  } else {
                    return currentFilters.replace(collectionSetId, '');
                  }
                })
              }}
            />
            <label htmlFor={collectionSetId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </section>
      <section>
        <p>{cards.length} cards</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {cards.map((card) => (
            <CardAsset
              key={card.uniqueId}
              card={card}
              isCollected={card.amount > 0}
              setHighlightedAsset={setHighlightedAsset}
            />
          ))}
        </div>
        <div
          className={cn(
            'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100/90 dark:bg-gray-900/90 p-4 rounded-2xl z-10 transition-all duration-300 ease-in-out',
            highlightedAsset ? 'visible' : 'invisible',
          )}
        >
          {highlightedAsset && <HighlightedAsset card={highlightedAsset} setHighlightedAsset={setHighlightedAsset} />}
        </div>
      </section>
    </section>
  );
}
