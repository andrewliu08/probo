import React, { useState } from "react";
import AccountContext from "./context";
import { DisplayNFT } from "./components/displayNFT";
import { PromptForm } from "./components/prompt";
import { Navbar } from "./components/navBar";
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

          <Navbar />
          

          <DisplayNFT />
          <PromptForm />
        </header>
      </div>
    </AccountContext.Provider>
  );
}

export default App;
