import React, { useContext, useEffect } from "react";
import MetaMaskSDK from "@metamask/sdk";
import AccountContext from "../context";
import MetaMaskLogo from "./metamask.png";

export const ConnectMetaMaskButton = () => {
  const MMSDK = new MetaMaskSDK();
  const ethereum = MMSDK.getProvider();
  const { account, setAccount } = useContext(AccountContext);

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

  const logoutMetaMask = () => {
    setAccount(null);
  };

  return (
    <div>
      {account ? (
        <div>
          <p>{`${account.slice(0, 6)}...${account.slice(-4)}`}</p>
          <button onClick={logoutMetaMask} className="metamask-button">
            <img src={MetaMaskLogo} alt="MetaMask Logo" className="metamask-logo" />
            Logout
          </button>
        </div>
      ) : (
        <button onClick={connectMetaMask} className="metamask-button">
          <img src={MetaMaskLogo} alt="MetaMask Logo" className="metamask-logo" />
          Connect MetaMask
        </button>
      )}
    </div>
  );
};
