import { ConnectMetaMaskButton } from "./components/wallet";
import { TextPromptForm } from "./components/prompt";
import { ArtSelection } from "./components/artSelection";

import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConnectMetaMaskButton />
        <ArtSelection />
        <TextPromptForm />
      </header>
    </div>
  );
}

export default App;
