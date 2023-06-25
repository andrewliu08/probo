import React, { useState } from "react";
import AccountContext from "./context";
import { ConnectMetaMaskButton } from "./components/wallet";
import { DisplayNFT } from "./components/displayNFT";
import { TextPromptForm } from "./components/prompt";
import { useIDKit, IDKitWidget } from "@worldcoin/idkit";

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [artistStyle, setArtistStyle] = useState(null);

  return (
    <AccountContext.Provider
      value={{ account, setAccount, artistStyle, setArtistStyle }}
    >
      <div className="App">
        <header className="App-header">
          <DisplayNFT />
          <ConnectMetaMaskButton />

          <IDKitWidget
            app_id="app_staging_c0520c3180cae840e95ed335c4447cbf" // obtain this from developer.worldcoin.org
            action=""
            enableTelemetry
            onSuccess={(result) => console.log(result)}
          >
            {({ open }) => <button onClick={open}>Click me</button>}
          </IDKitWidget>

          <TextPromptForm />
        </header>
      </div>
    </AccountContext.Provider>
  );
}

export default App;
