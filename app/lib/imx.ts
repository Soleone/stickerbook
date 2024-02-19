import { x } from '@imtbl/sdk';
import { Environment } from '@imtbl/sdk/config';
import { Asset } from '~/types';


const baseConfig = {
  environment: Environment.PRODUCTION,
  publishableKey: 'TODO: YOUR_PUBLISHABLE_KEY',
};

const collection = '0xacb3c6a43d15b907e8433077b6d38ae40936fe2c';
const imxClient = new x.IMXClient({ baseConfig });

export async function listAssets(user: string) {
  let assetCursor;
  let assets: Asset[] = [];

  // do {
    let assetsResponse = await imxClient.listAssets({
      user,
      collection,
      status: 'imx',
      // cursor: assetCursor,
    });
    console.log(assetsResponse);
    // type Asset = typeof assetsResponse.result;
    // assets = assets.concat(assetsResponse.result);
    // assetCursor = assetsResponse.cursor;
  // } while (assetCursor);
  
  return assetsResponse.result;
}