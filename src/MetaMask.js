import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

const MetaMask = ({ setMessages, messages }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const navigate = useNavigate();
  const handleMessages = () => {
    navigate("/messages");
  };

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
        accountChanged([res[0]]);
      });
    } else {
      setErrorMessage("Install Metamask Extention");
    }
  };
  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress)],
      })
      .then((balance) => {
        setUserBalance(ethers.formatEther(balance));
      });
  };
  const sendTransaction = async (e) => {
    setMessages([...messages, e.target.to_message.value]);
    e.preventDefault();
    let params = [
      {
        from: "0x2C5416c7b9155cC6D740FAb019696300a0fC4A49",
        to: e.target.to_address.value,
        gas: Number(21000).toString(16),
        gasPrice: Number(2500000).toString(16),
        value: Number(10000000000000000).toString(16),
      },
    ];
    let result = await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="metamask">
      <h1>Connect to Meta Mask Wallet!</h1>
      <button onClick={connectWallet}>Connect to wallet </button>
      <h4>Address: {defaultAccount}</h4>
      <h4>Balance: ${userBalance}</h4>

      <form onSubmit={sendTransaction}>
        <h3>Enter transaction Address:</h3>
        <input type="text" name="to_address" placeholder="Address" required />
        <input
          type="text"
          name="to_message"
          placeholder="Add a message"
          required
        />
        <input type="submit" value="Submit" />
      </form>
      {errorMessage}
      <button onClick={handleMessages}>Click to see the messages</button>
    </div>
  );
};

export default MetaMask;
