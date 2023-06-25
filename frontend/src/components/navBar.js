import React, { useContext } from "react";
import AccountContext from "../context";

import { FloatingImages } from "./floatingImages";
import { ConnectMetaMaskButton } from "./wallet";
import { IDKitWidget } from "@worldcoin/idkit";
import { generateUniqueImage } from "../api";

import LogoFinal from "./Logo-final.png";
import LogoText from "./Logo-text.png";

export const Navbar = () => {
  const { setUniqueImage } = useContext(AccountContext);

  const handleWorldIdResponse = async (result) => {
    const imageURL = await generateUniqueImage(result);
    setUniqueImage(imageURL);
  };

  return (
    <div className="container">
      <div className="left-column">
        <div className="grid-item">
          <img src={LogoFinal} alt="Logo" className="logo" />

          <img src={LogoText} alt="Logo-text" className="logotext" />

          <p>Probo. Unique one-of-a-kind landscape NFT. </p>

          <ConnectMetaMaskButton />

          <IDKitWidget
            app_id="app_946a85ccdca5b48f37f64c4fadb38467" // obtain this from developer.worldcoin.org
            action="probo-avatar"
            signal=""
            enableTelemetry
            onSuccess={handleWorldIdResponse}
          >
            {({ open }) => <button onClick={open}>Connect Worldcoin</button>}
          </IDKitWidget>
        </div>
      </div>
      <div className="right-column">
        <FloatingImages />
      </div>
    </div>
  );
};
