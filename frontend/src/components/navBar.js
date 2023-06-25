import React, { useContext } from 'react';
import AccountContext from '../context';

import { FloatingImages } from "./floatingImages";
import { ConnectMetaMaskButton } from "./wallet";
import { useIDKit, IDKitWidget } from "@worldcoin/idkit";

import LogoFinal from "./Logo-final.png";
import LogoText from "./Logo-text.png";

export const Navbar = () => {
    const { result, setWorldId } = useContext(AccountContext);

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
                        onSuccess={(result) => {
                            setWorldId(result);
                        }}
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