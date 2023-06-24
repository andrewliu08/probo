import { ConnectMetaMaskButton } from "./components/wallet";
import { TextPromptForm } from "./components/prompt";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ConnectMetaMaskButton />
        <TextPromptForm />
      </header>
    </div>
  );
}

export default App;
