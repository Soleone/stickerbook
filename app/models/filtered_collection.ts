import type { Card } from "./card";

export interface FilteredCollection {
  allCards: Card[]
  cards: Card[]
  filterOwned(owned: boolean): void
  filterBySet(setNames: string[]): void
}

export class FilteredCollection {
  constructor(cards: Card[]) {
    this.allCards = cards;
    this.cards = cards;
  }

  filterOwned(owned: boolean) {
    this.cards = this.allCards.filter(card => card.amount > 1)
  }

  filterBySet(setNames: String[]) {
    this.cards = this.allCards.filter(card => setNames.includes(card.set))
  }

}