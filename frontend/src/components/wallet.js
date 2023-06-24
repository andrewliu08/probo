import React, { useState, useEffect } from "react";
import MetaMaskSDK from "@metamask/sdk";

export const ConnectMetaMaskButton = () => {
  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();
  const [account, setAccount] = useState(null);

  useEffect(() => {
    // Check if MetaMask is already connected
    if (ethereum && ethereum.selectedAddress) {
      setAccount(ethereum.selectedAddress);
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      // Request account access if needed
      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
      } else {
        alert("MetaMask is not installed. Please install it and try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while connecting MetaMask.");
    }
  };

  return (
    <div>
      {account ? (
        <p>{`${account.slice(0, 6)}...${account.slice(-4)}`}</p>
      ) : (
        <button onClick={connectMetaMask}>Connect</button>
      )}
    </div>
  );
};
