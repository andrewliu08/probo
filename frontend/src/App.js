import React, { useState } from "react";
import { ConnectMetaMaskButton } from "./components/wallet";
import { DisplayNFT } from "./components/displayNFT";
import { TextPromptForm } from "./components/prompt";
import { useIDKit, IDKitWidget } from '@worldcoin/idkit'

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <DisplayNFT account={account} />
        <ConnectMetaMaskButton onAccountChange={setAccount} />

        <IDKitWidget
          app_id="app_946a85ccdca5b48f37f64c4fadb38467" // obtain this from developer.worldcoin.org
          action=""
          enableTelemetry
          onSuccess={result => console.log(result)}
        >
          {({ open }) => <button onClick={open}>Click me</button>}
        </IDKitWidget>

        <TextPromptForm />

      </header>
    </div>
  );
}

export default App;
