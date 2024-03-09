import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { redirect, useLoaderData } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';
import CardAsset from '~/components/CardAsset';
import HighlightedAsset from '~/components/HighlightedAsset';
import { cn } from '~/lib/utils';
import { Collection as GuCollection, collectionSetLabels } from '~/lib/gods_unchained';
import type { Card } from '~/models/card';
import { Checkbox } from '~/components/ui/checkbox';
import { FilteredCollection } from '~/models/filtered_collection';

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
  console.log('Start loader ');
  const url = new URL(request.url);
  const address = url.searchParams.get('address');
  const reload = url.searchParams.has('reload');
  const shouldReload = url.searchParams.has('reloaded');

  if (reload) {
    console.log('Redirecting for reload');
    return redirect("/collection?reloaded");
  }

  let cards: Card[] = [];
  if (shouldReload) {
    console.log('Reloading');
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
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [ownedFilter, setOwnedFilter] = useState<boolean>(true);
  const [setFilter, setSetFilter] = useState<string[]>([]);

  const handleOwnedFilterChange = useCallback((checked: boolean) => {
    const filteredCollection = new FilteredCollection(cards);
    setOwnedFilter(checked);
    filteredCollection.byOwned(checked);
    filteredCollection.bySet(setFilter);
    setFilteredCards(filteredCollection.cards);
  }, [setOwnedFilter, setFilter, cards, setFilteredCards]);

  const handleSetFilterChange = useCallback((set: string, checked: boolean) => {
    let newSets: string[];
    if (checked) {
      newSets = [...setFilter, set];
    } else {
      newSets = setFilter.filter(s => s !== set);
    }
    setSetFilter(newSets);
    const filteredCollection = new FilteredCollection(cards);
    console.log('Filtering by SET:', newSets);
    filteredCollection.bySet(newSets);
    filteredCollection.byOwned(ownedFilter);
    setFilteredCards(filteredCollection.cards);
  }, [setFilter, ownedFilter, setSetFilter, cards, setFilteredCards]);

  useEffect(() => {
    if (loadedCards.length > 0) {
      saveCachedCards(loadedCards)
    } else {
      const cachedCards = loadCachedCards();
      setCards(cachedCards);
      // setFilteredCards(cachedCards);
      // handleOwnedFilterChange(ownedFilter);
      // handleSetFilterChange(setFilter);
    }
  }, [loadedCards, handleOwnedFilterChange, handleSetFilterChange]);

  return (
    <section className='flex flex-col md:flex-row'>
      <section className='flex flex-col p-4 max-h-96 rounded-md mr-4 gap-2'>
        <div className="flex items-center space-x-2 w-48">
          <Checkbox
            id="owned"
            checked={ownedFilter}
            onCheckedChange={handleOwnedFilterChange}
          />
          <label htmlFor="owned"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
          >Owned
          </label>
        </div>

        <h2>Filter by set</h2>
        {Object.entries(collectionSetLabels).map(([set, label]) => (
          <div key={set} className="flex items-center space-x-2 w-48">
            <Checkbox
              id={set}
              checked={setFilter.includes(set)}
              onCheckedChange={(checked) => handleSetFilterChange(set, checked)}
            />
            <label htmlFor={set}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </section>
      <section>
        <p>{filteredCards.length} cards</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {filteredCards.map((card) => (
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
