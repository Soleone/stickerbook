

const setQualityArray = []
for (const quality in ownedSets) {
  for (const set in ownedSets[quality]) {
    setQualityArray.push([quality, set])
  }
}
//print out the array with indexes
for (let i = 0; i < setQualityArray.length; i++) {
  console.log(`${i}: ${setQualityArray[i][0]} ${setQualityArray[i][1]}`)
}

const setsArray = sets.split(',');
console.log({ setsArray })
for (let i = 0; i < setsArray.length; i++) {
  console.log(`${setsArray[i]}: ${setQualityArray[setsArray[i]][0]} ${setQualityArray[setsArray[i]][1]}`)
}

const confirmedSets = readlineSync.question('Confirm set Numbers to buy: \n').split(',');

await getTotalPrices(setsArray, ownedSets)
await buySets(confirmedSets)
await fetchAssetsAndSendBack(userAddress)
await getBalanceAndSendBack(userAddress)


async function buySets(confirmedSets) {
  for (let i = 0; i < confirmedSets.length; i++) {

    // get all items in th set with the lowest count
    const ordered = Object.entries(ownedSets[setQualityArray[confirmedSets[i]][0]][setQualityArray[confirmedSets[i]][1]]).sort((a, b) => a[1].count - b[1].count);
    // Make a new object with only the items with the lowest count
    const lowestCount = {}
    for (const [key, value] of ordered) {
      if (value.count === ordered[0][1].count) {
        lowestCount[key] = value
      }
    }
    // for each item in the lowestCount, get item and buy
    for (const [key, value] of Object.entries(lowestCount)) {
      console.log(`Buying ${key} - ${setQualityArray[confirmedSets[i]][0]}`)
      await buyItem(key, setQualityArray[setsArray[i]][0])
    }
  }
}



async function getTotalPrices(setsArray, ownedSets) {
  // for each item in setsArray
  for (let i = 0; i < setsArray.length; i++) {
    // get all the items in ownedSets[setQualityArray[setsArray[i]][0]][setQualityArray[setsArray[i]][1]] with lowest count
    const ordered = Object.entries(ownedSets[setQualityArray[setsArray[i]][0]][setQualityArray[setsArray[i]][1]]).sort((a, b) => a[1].count - b[1].count);
    // Make a new object with only the items with the lowest count
    const lowestCount = {}
    for (const [key, value] of ordered) {
      if (value.count === ordered[0][1].count) {
        lowestCount[key] = value
      }
    }
    // for each item in lowestCount, get the price and add to total
    let total = 0
    for (const [key, value] of Object.entries(lowestCount)) {
      await new Promise(r => setTimeout(r, 150));
      const price = await getPrice(key, setQualityArray[setsArray[i]][0])
      total += price
    }
    console.log(`Total for ${setQualityArray[setsArray[i]][0]} ${setQualityArray[setsArray[i]][1]}: ${total}`)
  }
}


async function fetchAssetsAndSendBack(mainWallet, cursor = "") {
  await new Promise(r => setTimeout(r, 150));
  const batch = []
  const url = `https://api.x.immutable.com/v1/assets?user=${mainWallet}&collection=${guCardsAddress}&cursor=${cursor}`
  return new Promise((resolve, reject) => {
    https.get(url, async (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });
      response.on('end', async () => {
        try {
          const jsonData = JSON.parse(data);
          if (jsonData && jsonData.result && Array.isArray(jsonData.result)) {
            jsonData.result.forEach((item) => {
              if (item.token_address === guCardsAddress) {
                batch.push({ tokenId: item.token_id, tokenAddress: item.token_address, receiver: mainWallet })
              }
            });
            await imxClient.batchNftTransfer(signers, batch)
            if (jsonData.remaining !== 0) {
              await fetchAssetsAndSendBack(mainWallet, jsonData.cursor)
            }
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
      console.error('Error fetching data:', error.message);
      reject(error);
    });
  });
}


async function buyItem(proto, quality) {
  const item = await getItemOrderId(proto, quality)
  if (!item.priceInEth || !item.orderId) { console.log(`Fail to fetch item ${proto}-${quality}`); return }
  try {
    await imxClient.createTrade(signers, {
      order_id: item.orderId,
      user: userAddress,
      fees: [
        {
          address: '0x691ea670f75dac6d42047873e6e486c6a8def546',
          fee_percentage: 2,
        }],
    })
    console.log(`Bought ${proto} - ${quality} for $${item.priceInEth}`)
  } catch (error) {
    await imxClient.createTrade(signers, {
      order_id: item.orderId,
      user: userAddress,
      fees: [
        {
          address: '0x691ea670f75dac6d42047873e6e486c6a8def546',
          fee_percentage: 2,
        }],
    })
  }

}

async function getBalanceAndSendBack(mainWallet) {
  const url = `https://api.x.immutable.com/v1/balances?user=${mainWallet}`
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
            const balance = jsonData.result[0].balance
            if (balance > 0) {
              imxClient.transfer(signers, {
                to: mainWallet,
                amount: balance,
              })
            }
            resolve(balance);
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


async function getItemOrderId(proto, quality) {
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
              const orderId = jsonData.result[0].order_id
              const priceInEth = parseFloat(jsonData.result[0].buy.data.quantity_with_fees) / Math.pow(10, 18) * ethPrice
              resolve({ orderId, priceInEth });
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