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
  "0x495f947276749ce646f68ac8c248420045cb7b5e",
  "0x495f947276749ce646f68ac8c248420045cb7b5e",
];
const tokenIds = [
  "111715845162217839571005182735797974174904274655258581438939978118123061510145",
  "111715845162217839571005182735797974174904274655258581438939978119222573137921",
];
<<<<<<< HEAD
const walletAddress = "0xF6FceD780Ca6Cd3f3d95Ae5bF8283c61dc22BAFB";
=======
>>>>>>> ebf5100d7e14d653872cfef415c3bb2663078fb1
const apiKey = "4cbadf7bdbff41aaa2b3b46b0c468e74";
const web3RPCURL =
  "https://flashy-old-star.discover.quiknode.pro/b64d2659a0871f264e2cddcfdbd2ba054cc77498/";
const openSeaAssetEndpoint =
  "https://api.opensea.io/api/v1/asset/{contractAddress}/{id}/?include_orders=false";

const checkHasNFT = async (account, contractAddress, tokenId) => {
  const web3 = new Web3(web3RPCURL);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const balance = await contract.methods.balanceOf(account, tokenId).call();
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

<<<<<<< HEAD
export const DisplayNFT = () => {
  const [nftData, setNftData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
=======
export const DisplayNFT = (account) => {
  const [nftData, setNftData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!account) {
      return;
    }
>>>>>>> ebf5100d7e14d653872cfef415c3bb2663078fb1
    const fetchNFTs = async () => {
      console.log("start");
      const fetchedNftData = [];

      for (let i = 0; i < contractAddresses.length; i++) {
        console.log("i", i);
        try {
<<<<<<< HEAD
          const hasNFT = await checkHasNFT(contractAddresses[i], tokenIds[i]);
=======
          const hasNFT = await checkHasNFT(
            account.account,
            contractAddresses[i],
            tokenIds[i]
          );
>>>>>>> ebf5100d7e14d653872cfef415c3bb2663078fb1
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
<<<<<<< HEAD
  }, []);
=======
  }, [account]);

  const handleImageClick = (nftId) => {
    if (selectedImage === nftId) {
      setSelectedImage(null);
    } else {
      setSelectedImage(nftId);
    }
  };
>>>>>>> ebf5100d7e14d653872cfef415c3bb2663078fb1

  const handleImageClick = (nftId) => {
    if (selectedImage === nftId) {
      setSelectedImage(null);
    } else {
      setSelectedImage(nftId);
    }
  };

  return (
    <div className="art-selection-container">
<<<<<<< HEAD
      {nftData.length === 0 ? (
=======
      {!nftData ? (
>>>>>>> ebf5100d7e14d653872cfef415c3bb2663078fb1
        <p>Checking...</p>
      ) : (
        nftData.map((data, index) => (
          <div
            key={index}
            className={`art-selection-image ${
              selectedImage === data.id ? "art-selection-image-selected" : ""
            }`}
            onClick={() => handleImageClick(data.id)}
          >
            <img src={data.image_url} alt="NFT" />
          </div>
        ))
      )}
    </div>
  );
};
