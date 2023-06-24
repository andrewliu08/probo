import { CredentialType, IDKitWidget } from "@worldcoin/idkit";

function App() {
  const handleProof = (result) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 3000);
      // NOTE: Example of how to decline the verification request and show an error message to the user
    });
  };

  const onSuccess = (result) => {
    console.log(result);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const credentialTypesParam = urlParams.get("credential_types");
  const credentialTypes =
        credentialTypesParam && credentialTypesParam.length > 0
        ? credentialTypesParam.split(",").map((type) => type.trim()) as CredentialType[] : [CredentialType.Orb, CredentialType.Phone];

  const action = urlParams.get("action") || "";
  const appId = urlParams.get("app_id") || "wid_staging_1234";

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IDKitWidget
        action={action}
        signal="my_signal"
        onSuccess={onSuccess}
        handleVerify={handleProof}
        app_id={appId}
        credential_types={credentialTypes}
        // walletConnectProjectId="get_this_from_walletconnect_portal"
      >
        {({ open }) => <button onClick={open}>Click me</button>}
      </IDKitWidget>
    </div>
  );
}

export default App;