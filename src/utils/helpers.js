import Web3 from "web3";
import erc20Abi from "../abis/erc20.abi.json";

const RPC_URL = "https://mainnet.infura.io/v3/1ab1aff8d8fc45e09d68150fcf0e63bb";

export const web3Instance = new Web3(new Web3.providers.HttpProvider(RPC_URL));
export const fetchTransferEvents = (token, wallet, option) => {
  const contract = new web3Instance.eth.Contract(erc20Abi, token.toLowerCase().trim());
  return contract.getPastEvents('Transfer', {
    filter: {
      [option.toLowerCase()]: wallet,
    },
    fromBlock: 0,
    toBlock: 'latest'
  })
}

export const getDecimals = (token) => {
  const contract = new web3Instance.eth.Contract(erc20Abi, token.toLowerCase().trim());
  return contract.methods.decimals().call()
}
export const getUnit = (decimals) => {
  let decimalString = "1".padEnd(Number(decimals)+1,'0');
  let { unitMap } = Web3.utils;
  let unit = Object.keys(unitMap).find((k) => unitMap[k] === decimalString);
  return unit;
}

export const fromWei = (value, decimals) => {
  return Web3.utils.fromWei(value, getUnit(decimals));
}