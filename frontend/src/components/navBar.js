import React, { useContext, useState } from 'react';
import AccountContext from '../context';

import { FloatingImages } from "./floatingImages";
import { ConnectMetaMaskButton } from "./wallet";
import { IDKitWidget } from "@worldcoin/idkit";
import { generateUniqueImage } from "../api";

import WorldcoinLogo from "./worldcoin.png";
import OpenSeaLogo from "./opensea.png";

import LogoFinal from "./Logo-final.png";
import LogoText from "./Logo-text.png";

export const Navbar = () => {
    const { setUniqueImage } = useContext(AccountContext);
    const [worldcoinConnected, setWorldcoinConnected] = useState(false);
    const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleWorldIdResponse = async (result) => {
    const imageURL = await generateUniqueImage(result);
    setUniqueImage(imageURL);
    setWorldcoinConnected(true);
    setVerificationSuccess(true);
  };

    return (
        <div className="container">
            <div className="left-column">
                <div className="grid-item">
                    <img src={LogoFinal} alt="Logo" className="logo" />

                    <img src={LogoText} alt="Logo-text" className="logotext" />

                    <p>Experience Probo, where the window to your soul becomes a portal to the Earth itself. Through WorldCoin's authentication, our WebApp unveils personalized vistas, born from the uniqueness of your iris. Powered by AI, our landscapes are a breathtaking fusion of reality and imagination. Embark on a visual journey like no other, where your individuality shapes the beauty you behold. @ETHGlobal Waterloo 2023 </p>

                    {/* Show just Connect World Coin */}
                    {!worldcoinConnected && (
                        <IDKitWidget
                            app_id="app_946a85ccdca5b48f37f64c4fadb38467"
                            action="probo-avatar"
                            signal=""
                            enableTelemetry
                            onSuccess={handleWorldIdResponse}
                        >
                            {({ open }) => (
                                <button onClick={open} className="metamask-button">
                                    <img src={WorldcoinLogo} alt="Worldcoin Logo" className="metamask-logo" />
                                    Connect Worldcoin
                                </button>
                            )}
                        </IDKitWidget>
                    )}
                    {/* If World Coin connected, show Metamask Connect + Mint Your Avatar */}
                    {worldcoinConnected && verificationSuccess && (
                        <>
                            <ConnectMetaMaskButton />
                            <button className="mint-button">
                            <img src={OpenSeaLogo} alt="Opensea Logo" className="metamask-logo" />
                            Mint Your Avatar
                            </button>
                        </>
                    )}
                </div>
            </div>
            <div className="right-column">
                <FloatingImages />
            </div>
    </div>
  );
};
