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

const contractAddresses = [
  "0x2953399124f0cbb46d2cbacd8a89cf0599974963",
  "0x2953399124f0cbb46d2cbacd8a89cf0599974963",
];
const tokenIds = [
  "111715845162217839571005182735797974174904274655258581438939978117023549882369",
  "111715845162217839571005182735797974174904274655258581438939978118123061510145",
];
const walletAddress = "0xF6FceD780Ca6Cd3f3d95Ae5bF8283c61dc22BAFB";
const apiKey = "4cbadf7bdbff41aaa2b3b46b0c468e74";
const web3RPCURL =
  "https://spring-soft-bird.matic.discover.quiknode.pro/96051ef142b0786b1e77417fd97ba131886018ec/";
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
  const [nftData, setNftData] = useState([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      console.log("start");
      const fetchedNftData = [];

      for (let i = 0; i < contractAddresses.length; i++) {
        console.log("i", i);
        try {
          const hasNFT = await checkHasNFT(contractAddresses[i], tokenIds[i]);
          console.log("hasNFT", hasNFT);
          if (hasNFT) {
            const metadata = await getNFTMetadata(
              contractAddresses[i],
              tokenIds[i]
            );
            fetchedNftData.push(metadata);
            console.log("metadata", metadata);
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }

      setNftData(fetchedNftData);
    };

    fetchNFTs();
  }, []);

  return (
    <div>
      {nftData.length === 0 ? (
        <p>Checking...</p>
      ) : (
        nftData.map((data, index) => (
          <div key={index}>
            <img src={data.imageUrl} alt="NFT" style={{ width: "300px" }} />
          </div>
        ))
      )}
    </div>
  );
};
