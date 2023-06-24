import React, { useEffect, useState } from "react";
import Web3 from "web3";

const contractABI = [
  {
    constant: true,
    inputs: [
      {
        name: "account",
        type: "address",
      },
      {
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const contractAddresses = [""];
const tokenIds = [""];
const walletAddress = "0xF6FceD780Ca6Cd3f3d95Ae5bF8283c61dc22BAFB";
const apiKey = "4cbadf7bdbff41aaa2b3b46b0c468e74";
const web3RPCURL = "";
const openSeaAssetEndpoint =
  "https://api.opensea.io/api/v1/asset/{contractAddress}/{id}/?include_orders=false";

const checkHasNFT = async (contractAddress, tokenId) => {
  const web3 = new Web3(web3RPCURL);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const balance = await contract.methods
    .balanceOf(walletAddress, tokenId)
    .call();
  const hasNFT = parseInt(balance, 10) > 0;
  return hasNFT;
};

const getNFTMetadata = async (contractAddress, tokenId) => {
  const endpointURL = openSeaAssetEndpoint
    .replace("{contractAddress}", contractAddress)
    .replace("{id}", tokenId);
  const response = await fetch(endpointURL, {
    headers: {
      "X-API-KEY": apiKey,
    },
  });
  const metadata = await response.json();
  return metadata;
};

export const DisplayNFT = () => {
  const [hasNFT, setHasNFT] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const checkBalanceAndFetchMetadata = async () => {
      try {
        const userHasNFT = await checkHasNFT(contractAddresses[0], tokenIds[0]);
        setHasNFT(userHasNFT);
        console.log("hasNFT", userHasNFT); // Use the updated value here
        if (userHasNFT) {
          fetchNFTMetadata();
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    const fetchNFTMetadata = async () => {
      try {
        const metadata = await getNFTMetadata(
          contractAddresses[0],
          tokenIds[0]
        );
        setImageUrl(metadata.image_url);
      } catch (error) {
        console.error("An error occurred while fetching metadata:", error);
      }
    };

    checkBalanceAndFetchMetadata();
  }, []);

  return (
    <div>
      {hasNFT === null ? (
        "Checking..."
      ) : (
        <div>
          <p>Has NFT: {hasNFT.toString()}</p>
          {imageUrl && (
            <img src={imageUrl} alt="NFT" style={{ width: "300px" }} />
          )}
        </div>
      )}
    </div>
  );
};
