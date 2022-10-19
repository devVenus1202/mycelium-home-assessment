import React, { useState } from 'react'
import { Web3Context } from '../stores/web3Context';
import { getDecimals } from '../utils/helpers';
const FetchForm = (props) => {
  const [walletAddress, setWalletAddress] = useState('0xeE031f5fa5dA24Df129Bd9Ad1B25200143433b9e'); 
  const [tokenAddress, setTokenAddress] = useState('');
  const [option, setOption] = useState('From');
  const handleFetch = (e) => {
    e.preventDefault();
    if (!walletAddress || !tokenAddress) return;
    if (props.onFetch) {
      props.onFetch({tokenAddress, walletAddress, option});
    }
  }
  const handleChangeToken = (e) => {
    setTokenAddress(e.target.value);
  }
  const handleChangeWallet = (e) => {
    setWalletAddress(e.target.value);
  }
  const handleChangeOption = (e) => {
    setOption(e.target.value);
  }
  return (
    <Web3Context.Consumer>
      {
        ({setDecimal}) => {
          return (
            <div className="form-container">
              <form className="register-form">
                <input type="text" placeholder="Account Address" className="form-field" value={walletAddress} onChange={handleChangeWallet} />
                <input type="text" placeholder="Token Address"  className="form-field" value={tokenAddress} onChange={(e) => {
                  handleChangeToken(e);
                  getDecimals(e.target.value).then(res => {
                    setDecimal(res)
                  })
                }} />
                <select type="text" placeholder="Token Address"  className="form-field" onChange={handleChangeOption}>
                  <option>From</option>
                  <option>To</option>
                </select>
                <button className="form-field" onClick={handleFetch}>Fetch Events</button>
              </form>
              {(!walletAddress || !tokenAddress) && (
                <div className='form-validator'>
                  Please input ERC-20 token address and account address 
                </div>
              )}
            </div>
          )
        }
      }
    </Web3Context.Consumer>
  )
}

export default FetchForm