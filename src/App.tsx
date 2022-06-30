import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
// import contractToken2 from './ethereum/abis/Main.json';
import contractToken from './ethereum-hardhat/artifacts/src/ethereum-hardhat/contracts/Main.sol/Main.json';

function App() {

  const [contractAddress, setContractAddress] = useState<any>('');
  const [contract, setContract] = useState<any>('');

  const [buyAddress, setbuyAddress] = useState<any>('');
  const [buyValue, setBuyValue] = useState<any>(0);
  const [buyAmountValue, setBuyAmountValue] = useState<any>(0);

  const [balanceAddress, setBlanceAddress] = useState<any>('');
  const [balanceResult, setBlanceResult] = useState<any>(0);

  const [totalSupply, setTotalSupply] = useState<any>(0);

  const [generateMVTAmount, setGenerateMVTAmount] = useState<any>(0);

  const [priceValueMVT, setPriceValueMVT] = useState<any>(0);
  const [priceValueETH, setPriceValueETH] = useState<any>(0);

  useEffect(() => {
    //@ts-ignore
    if (window.web3) {
      initialize();
      loadData();
    }
  }, []);

  const loadData = async () => {

    //@ts-ignore
    const Web3 = window.web3;

    const abi = contractToken.abi;
    //0x698Bc7C56962b684406Ccf5b3b1Ec0E7E0b9f779 1mvt -> 1eth
    //0x4F2441540f35972001d5C1b9A86C9a900bDE2cEF 1mvt -> 0.01eth
    const contrAdd = '0x698Bc7C56962b684406Ccf5b3b1Ec0E7E0b9f779';
    const contractDeployed = new Web3.eth.Contract(abi, contrAdd);

    /*GANACHE*/
    // const networkData = contractToken2.networks['5777'];
    // const contractDeployed = new Web3.eth.Contract(abi, networkData.address);
    //////////

    setContractAddress(await contractDeployed.methods.getContractAddress().call());

    setContract(contractDeployed);
  }

  const buyTokens = async () => {
    //@ts-ignore
    const Web3 = window.web3;

    const account = buyAddress;
    const ethValueToSend = buyValue;

    try {
      await contract.methods.buyTokens(account, buyAmountValue).send({ from: account, value: Web3.utils.toWei(ethValueToSend, "ether") });
      alert("Finished Transaction!");
    } catch (e) {
      alert("Transaccion Failed!");
    }
  }

  const getBalance = async () => {
    if (balanceAddress !== '') {
      const balance = await contract.methods.balanceAccount(balanceAddress).call();
      setBlanceResult(balance);
    } else {
      alert("No address given");
    }
  }

  const getTotalSupply = async () => {
    const totalSupplyBalance = await contract.methods.getTotalSupply().call();
    setTotalSupply(totalSupplyBalance);
  }

  const generateCoins = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts();
    await contract.methods.generateTokens(generateMVTAmount).send({ from: accounts[0]});
    alert("Generated " + generateMVTAmount + " COINS")
  }

  const getPrice = async () => {
    const priceResut = await contract.methods.priceTokens(priceValueMVT).call();
    setPriceValueETH(priceResut / 10 ** 18);
  }

  return (
    <div className='content-container'>
      <nav className="navbar navbar-dark bg-dark">
        <span className='navbar-brand'>
          <img src={logo} className="App-logo" alt="logo" />
          <strong>Maveto COIN</strong>
        </span>
        <form className="form-inline my-2 my-lg-0">
          <button className='btn btn-success' onClick={() => connectWallet()}>Connect Wallet</button>
        </form>
      </nav>
      <div className='content'>

        <div className='myForm'>
          <h2 className='title'>Buy Maveto COIN</h2>
          <input type="text" value={buyAddress} onChange={(event) => setbuyAddress(event.target.value)} className="form-control" placeholder="Address" />

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Maveto Amount (1 MVT = 1 ETH):</span>
            </div>
            <input type="number" value={buyAmountValue} onChange={(event) => setBuyAmountValue(event.target.value)} className="form-control" placeholder="Maveto Amount (1 MVT = 1 ETH)" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">ETH to send:</span>
            </div>
            <input type="number" value={buyValue} onChange={(event) => setBuyValue(event.target.value)} className="form-control" placeholder="ETH to send" />
          </div>
          <button type="button" className="btn btn-success" onClick={() => buyTokens()}>BUY</button>
        </div>

        <div className='myForm'>
          <h2 className='title'>Maveto Balance from Account</h2>
          <input type="text" value={balanceAddress} onChange={(event) => setBlanceAddress(event.target.value)} className="form-control" placeholder="Address" />
          <h4>Your balance: {balanceResult} MVT</h4>
          <button type="button" className="btn btn-success" onClick={() => getBalance()}>SHOW</button>
        </div>

        <div className='myForm'>
          <h2 className='title'>Total Supply Balance from Smart Contract</h2>
          <h4>{totalSupply} MVT</h4>
          <button type="button" className="btn btn-success" onClick={() => getTotalSupply()}>SHOW</button>
        </div>

        <div className='myForm'>
          <h2 className='title'>Generate Maveto Coins</h2>
          <p>Amount of MVT:</p>
          <input type="number" value={generateMVTAmount} onChange={(event) => setGenerateMVTAmount(event.target.value)} className="form-control" placeholder="Maveto Amount" />
          <button type="button" className="btn btn-success" onClick={() => generateCoins()}>GENERATE</button>
        </div>

        <div className='myForm'>
          <h2 className='title'>Smart Contract Deployed in Rinkeby</h2>
          <h3>Contract Address: </h3>
          <p>{contractAddress}</p>
        </div>

        <div className='myForm'>
          <h2 className='title'>Price per Maveto in ETH</h2>
          <p>Amount in MVT:</p>
          <input type="number" value={priceValueMVT} onChange={(event) => setPriceValueMVT(event.target.value)} className="form-control" placeholder="Maveto Amount" />
          <p>{priceValueMVT} MVT = {priceValueETH} ETH</p>
          <button type="button" className="btn btn-success" onClick={() => getPrice()}>SHOW</button>
        </div>

      </div>
    </div>
  );
}

export default App;
