export interface Card {
  protoId: number;
  quality: number;
  uniqueId: string;
  name: string;
  imageUrl: string;
  amount: number;
  ethPrice?: number;
  usdPrice?: number;
  set: string;
  rarity: string;
}

type CardConstructor = Pick<Card, 'protoId' | 'quality' | 'name' | 'set' | 'rarity'> & Partial<Pick<Card, 'amount'>>;

export class Card {
  constructor({ protoId, quality, name, set, rarity, amount = 0 }: CardConstructor) {
    this.protoId = protoId;
    this.quality = quality;
    this.uniqueId = `${protoId}-${quality}`;
    this.name = name;
    this.imageUrl = `https://card.godsunchained.com/?id=${protoId}&q=${quality}&w=256`;
    this.amount = amount;
    this.ethPrice = 0;
    this.usdPrice = 0;
    this.set = set;
    this.rarity = rarity;
  }
}