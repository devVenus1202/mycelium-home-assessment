const axios = require("axios")
const fs = require("fs")
const THE_GRAPH_URL = "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2"
const filepath = "./hourlypairdata.json"
let readcount = 0;
const timestamp = new Date("2022-08-01").getTime() / 1000; // can get from command line
const fetchPairHourDatas  = () => {
  const variables = {
    pair: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",  // DAI/WETH pair,
    timestamp // use seconds timestamp
  }
  axios.post(THE_GRAPH_URL, {
		query:`
			query getUserCollateralHistory($pair: String!, $timestamp: Int!) {
        pairHourDatas(
          first: 1000
          skip: ${readcount}
          where: { pair: $pair, hourStartUnix_gte: $timestamp }
          orderBy: hourStartUnix
          orderDirection: desc
        ) {
          id
          hourStartUnix
          reserve0
          reserve1
          reserveUSD
          pair {
            token0 {
              id
              symbol
            }
            token1 {
              id
              symbol
            }
          }
        }
			}`,
		variables
	}).then(async res => {
    // handle data processing. e.g writing to file
    await fs.appendFile(filepath, JSON.stringify(res.data.data.pairHourDatas), err => {
      if (err) {
        console.error(err);
      }
    });
    if (res.data.data.pairHourDatas.length < 1000) {
      readcount += res.data.data.pairHourDatas.length;
      fs.closeSync(fs.openSync(filepath, 'w'));
    } else {
      readcount += 1000;
      fetchPairHourDatas()
    }
    console.log(`${readcount} rows loaded..`)

  });
}

fs.openSync(filepath, 'w')

fetchPairHourDatas()