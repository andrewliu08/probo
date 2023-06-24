import { ConnectMetaMaskButton } from "./components/wallet";
import { DisplayNFT } from "./components/displayNFT";
import { TextPromptForm } from "./components/prompt";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DisplayNFT />
        <ConnectMetaMaskButton />
        <TextPromptForm />
      </header>
    </div>
  );
}

export default App;
