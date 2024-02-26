export interface Card {
  protoId: number;
  quality: number;
  uniqueId: string;
  name: string;
  imageUrl: string;
  amount: number;
  ethPrice?: number;
  usdPrice?: number;
}

type CardConstructor = Pick<Card, 'protoId' | 'quality' | 'name'> & Partial<Pick<Card, 'amount'>>;

export class Card {
  constructor({ protoId, quality, name, amount = 0 }: CardConstructor) {
    this.protoId = protoId;
    this.quality = quality;
    this.uniqueId = `${protoId}-${quality}`;
    this.name = name;
    this.imageUrl = `https://card.godsunchained.com/?id=${protoId}&q=${quality}`;
    this.amount = amount;
    this.ethPrice = 0;
    this.usdPrice = 0;
  }
}