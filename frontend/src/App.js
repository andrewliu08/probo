import React, { useState } from "react";
import { ConnectMetaMaskButton } from "./components/wallet";
import { DisplayNFT } from "./components/displayNFT";
import { TextPromptForm } from "./components/prompt";
import "./App.css";

function App() {
  const [account, setAccount] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <DisplayNFT account={account} />
        <ConnectMetaMaskButton onAccountChange={setAccount} />
        <TextPromptForm />
      </header>
    </div>
  );
}

export default App;
