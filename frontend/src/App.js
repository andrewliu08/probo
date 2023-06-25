import React, { useState } from "react";
import AccountContext from "./context";
import { ConnectMetaMaskButton } from "./components/wallet";
import { DisplayNFT } from "./components/displayNFT";
import { PromptForm } from "./components/prompt";
import { useIDKit, IDKitWidget } from "@worldcoin/idkit";

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [worldId, setWorldId] = useState(null);
  const [artistStyle, setArtistStyle] = useState(null);

  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        artistStyle,
        setArtistStyle,
        worldId,
        setWorldId,
      }}
    >
      <div className="App">
        <header className="App-header">
          <DisplayNFT />
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
            {({ open }) => <button onClick={open}>Click me</button>}
          </IDKitWidget>

          <PromptForm />
        </header>
      </div>
    </AccountContext.Provider>
  );
}

export default App;
