import type { Card } from "./card";

export interface FilteredCollection {
  allCards: Card[]
  cards: Card[]
  byOwned(owned: boolean): void
  bySet(setNames: string[]): void
}

export class FilteredCollection {
  constructor(cards: Card[]) {
    this.allCards = cards;
    this.cards = cards;
  }

  byOwned(owned: boolean) {
    console.log('Filtering by owned:', owned);
    this.cards = this.cards.filter(card => owned ? card.amount > 1 : true)
  }

  bySet(sets: String[]) {
    console.log('Filtering by sets:', sets);
    this.cards = this.cards.filter(card => sets.length > 0 ? sets.includes(card.set) : true)
  }

  reset() {
    this.cards = this.allCards;
  }
}