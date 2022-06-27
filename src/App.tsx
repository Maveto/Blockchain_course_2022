import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { connectWallet, initialize } from './ethereum/web3';
import contractLottery from './ethereum/abis/Lottery.json';

function App() {

  const [contract, setContract] = useState<any>('');

  const [manager, setManager] = useState<any>('');
  const [players, setPlayers] = useState<any>([]);
  const [balance, setBalance] = useState<any>('');

  const [value, setValue] = useState<any>('');
  const [message, setMessage] = useState<any>('');

  useEffect( () => {
    //@ts-ignore
    if(window.web3) {
      initialize();
      loadBlockchainData();
    }
  }, []);

  const loadBlockchainData = async () => {

    //@ts-ignore
    const Web3 = window.web3;

    const networkData = contractLottery.networks['5777'];
    console.log('networkData', networkData);
    if(networkData) {
      const abi = contractLottery.abi;
      const address = networkData.address;

      const contractDeployed = new Web3.eth.Contract(abi, address);
      setContract(contractDeployed);
      console.log(contract);

      setPlayers(await contractDeployed.methods.getPlayers().call());
      setManager(await contractDeployed.methods.manager().call());
      setBalance(await Web3.eth.getBalance(contractDeployed.options.address));

    }
  };

  const loadPlayers = async () => setPlayers(await contract.methods.getPlayers().call());

  const loadBalance = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    setBalance(await Web3.eth.getBalance(contract.options.address))
  };

  const onEnter = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");

    await contract.methods.enter().send({
      from: accounts[0],
      value: Web3.utils.toWei(value, "ether")
    });

    setMessage("Transaction Success, Welcome to the lottery");
    loadBalance();
    loadPlayers();
  }

  const onPickWinner = async () => {
    //@ts-ignore
    const Web3 = window.web3;
    const accounts = await Web3.eth.getAccounts();
    setMessage("Waiting on transaction success...");

    await contract.methods.pickWinner().send({
      from: accounts[0]
    });

    setMessage("Transaction Success, Welcome to the lottery");
    loadBalance();
    loadPlayers();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          
        <button onClick={() => {connectWallet()}} className="btn btn-success">Connect</button>
        <button onClick={() => {onPickWinner()}} className="btn btn-success">Pick Winner</button>

        <p>Players: {players.length}</p>
        <p>Balance: {balance}</p>
        <p>Manager: {manager}</p>

        <p>Monto minimo mayor 2 ETH</p>
        <div className="col align-self-center">
          <input type="number" value={value} onChange={(event) => {setValue(event.target.value)}} className="form-control" />
          <button onClick={() => {onEnter()}} className="btn btn-warning">Enter</button>
        </div>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
