import React, { useState } from "react";
import AccountContext from "./context";
import { Navbar } from "./components/navBar";

import "./App.css";

function App() {
  const [account, setAccount] = useState(null);
  const [worldId, setWorldId] = useState(null);
  const [uniqueImage, setUniqueImage] = useState(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
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
        uniqueImage,
        setUniqueImage,
        isGeneratingImage,
        setIsGeneratingImage,
      }}
    >
      <div className="App">
        <header className="App-header">
          <Navbar />
        </header>
      </div>
    </AccountContext.Provider>
  );
}

export default App;
