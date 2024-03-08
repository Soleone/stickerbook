import https from "https";
import protos from "~/data/protos";
import { Card } from "~/models/card";

// const ethPrice = Number(await getEthPrice())

// 1. Initialize empty collection
// const ownedSets = await readProtos()

// 2. Reconcile actual collection
// const cards = []; 
// await fetchOwnedAssets(mainWallet, ownedSets, cards)

export interface Collection {
  address: string;
  indexedCards: Record<string, Card>;
}

interface CardItem {
  token_address: string;
  metadata: {
    quality: string;
    proto: number;
  };
}

export const collectionSetNames = [
  "genesis",
  "etherbots",
  "promo",
  "trial",
  "core",
  "order",
  "mortal",
  "mythic",
  "verdict",
  "wander",
  "wolf",
  "tides",
  "welcome"
]

export const collectionSetLabels = {
  "genesis": "Genesis",
  "etherbots": "Etherbots",
  "promo": "Promo",
  "trial": "Trial of the Gods",
  "core": "Core",
  "order": "Divine Order",
  "mortal": "Mortal Judgment",
  "mythic": "Mythic",
  "verdict": "Light's Verdict",
  "wander": "Winter Wonderlands",
  "wolf": "Band of the Wolf",
  "tides": "Tides of Fate",
  "welcome": "Welcome"
}
export const GODS_UNCHAINED_CONTRACT_ADDRESS = "0xacb3c6a43d15b907e8433077b6d38ae40936fe2c"

export class Collection {
  constructor(address: string) {
    this.address = address;
    this.indexedCards = {};
    this.initialize();
  }

  addCard(card: Card) {
    if (card.protoId >= 9999) { return }

    const existingCard = this.getCard(card.protoId, card.quality)

    if (existingCard) {
      console.log('Adding card:', card.protoId, card.quality, existingCard.amount + 1);
      existingCard.amount += 1;
    } else {
      throw new Error(`Card not found: ${card.protoId} - ${card.quality}`);
    }
  }


  getCard(protoId: number, quality: number) {
    return this.indexedCards[this.cacheKey(protoId, quality)];
  }


  async load() {
    await fetchOwnedAssets(this.address, this);
  }

  cardsByQuality(quality: number) {
    return Object.values(this.indexedCards).filter(card => card.quality === quality);
  }

  collectedCards() {
    return Object.values(this.indexedCards).filter((card) => {
      console.log('Checking collected card:', card.uniqueId, card.amount);
      return card.amount > 0
    });
  }

  private async initialize() {
    let entries = Object.entries(protos);

    for (const [protoId, proto] of entries) {
      if (parseInt(protoId) >= 9999) { continue }

      const qualities = [4, 3, 2, 1];
      for (const quality of qualities) {
        const card = new Card({
          protoId: parseInt(protoId),
          quality: quality,
          name: proto.name,
          set: proto.set,
          rarity: proto.rarity,
        });
        const key = this.cacheKey(parseInt(protoId), quality);
        this.indexedCards[key] = card;
      }
    }
  }

  private cacheKey(protoId: number, quality: number) {
    return `${protoId}-${quality}`;
  }
}

// const collection = new Collection(DEFAULT_ADDRESS);
// await collection.load();
// collection.cardsByQuality(1)

const qualityByString: Record<string, number> = {
  "Meteorite": 4,
  "Shadow": 2,
  "Gold": 3,
  "Diamond": 4
};

export async function fetchOwnedAssets(mainWallet: string, collection: Collection, cursor = "") {
  await new Promise(r => setTimeout(r, 150));

  const url = `https://api.x.immutable.com/v1/assets?user=${mainWallet}&collection=${GODS_UNCHAINED_CONTRACT_ADDRESS}&cursor=${cursor}`
  return new Promise((resolve, reject) => {
    const request = https.get(url, async (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', async () => {
        try {
          const jsonData = JSON.parse(data);
          cursor = jsonData.cursor
          if (jsonData && jsonData.result && Array.isArray(jsonData.result)) {
            jsonData.result.forEach((item: CardItem) => {
              if (item.token_address === GODS_UNCHAINED_CONTRACT_ADDRESS) {
                try {
                  if (item.metadata.proto < 9999) {
                    const card = collection.getCard(item.metadata.proto, qualityByString[item.metadata.quality]);
                    collection.addCard(card);
                  }
                } catch (error) {
                  console.log({ error })
                }
              }

            });

            // if (jsonData.remaining !== 0) {
            //   await fetchOwnedAssets(mainWallet, collection, cursor)
            // }
            resolve();
          } else {
            console.log('Invalid JSON format or missing data.result array.');
            reject(new Error('Invalid JSON format or missing data.result array.'));
          }
        } catch (error) {
          console.error('Error parsing JSON:', error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      if (error.code === 'ECONNRESET') {
        console.error('Connection reset by peer. Retrying...');
        request.abort();
        setTimeout(() => {
          fetchOwnedAssets(mainWallet, collection, cursor).then(resolve).catch(reject);
        }, 1000);
      } else {
        console.error('Error fetching data:', error.message);
        reject(error);
      }
    });
  });
}


// card.ethPrice = getPrice(card.protoId, card.quality);

async function getPrice(proto, quality) {
  const url = `https://api.x.immutable.com/v3/orders?page_size=50&status=active&buy_token_type=ETH&sell_token_address=0xacb3c6a43d15b907e8433077b6d38ae40936fe2c&direction=asc&order_by=buy_quantity_with_fees&sell_metadata={%22proto%22%3A%20[%22${proto}%22]%2C%22quality%22%3A[%22${quality}%22]}`

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData && jsonData.result && Array.isArray(jsonData.result)) {
            if (jsonData.result[0]) {
              const usdPrice = parseFloat(jsonData.result[0].buy.data.quantity_with_fees) / Math.pow(10, 18) * ethPrice
              resolve(usdPrice);
            } else {
              console.log(`No orders found for ${proto} - ${quality}`)
              resolve(0);
            }
          } else {
            console.log('Invalid JSON format or missing data.result array.');
            reject(new Error('Invalid JSON format or missing data.result array.'));
          }
        } catch (error) {
          console.error('Error parsing JSON:', error.message);
          reject(error);
        }
      });
    }).on('error', (error) => {
      console.error('Error fetching data:', error.message);
      reject(error);
    });
  });
}

async function getEthPrice() {
  const url = `https://api.coinbase.com/v2/prices/eth-usd/spot`
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData.data.amount);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}