import React, { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import AccountContext from "../context";

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

export const proboNFTs = [
  {
    contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    tokenId:
      "111715845162217839571005182735797974174904274655258581438939978120322084765697",
  },
];

const artistNFTs = [
  {
    artist: "van_gogh",
    contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    tokenId:
      "111715845162217839571005182735797974174904274655258581438939978118123061510145",
  },
  {
    artist: "rembrandt",
    contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    tokenId:
      "111715845162217839571005182735797974174904274655258581438939978119222573137921",
  },
  {
    artist: "spedward",
    contractAddress: "0x495f947276749ce646f68ac8c248420045cb7b5e",
    tokenId:
      "20222148730939510742085223881991044139457813020212785641302316542131766820865",
  },
  {
    artist: "andy",
    contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
    tokenId:
      "74743269691400256161474562831061133918838157159896849151698386143212004704257",
  },
  {
    artist: "amir",
    contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
    tokenId:
      "93478729683723419007047079989949114255691551576804525283770076826191492284417",
  },
];
const apiKey = "4cbadf7bdbff41aaa2b3b46b0c468e74";
const web3RPCURL =
  "https://flashy-old-star.discover.quiknode.pro/b64d2659a0871f264e2cddcfdbd2ba054cc77498/";
const openSeaAssetEndpoint =
  "https://api.opensea.io/api/v1/asset/{contractAddress}/{id}/?include_orders=false";

export const checkHasNFT = async (account, contractAddress, tokenId) => {
  const web3 = new Web3(web3RPCURL);
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  const balance = await contract.methods.balanceOf(account, tokenId).call();
  const hasNFT = parseInt(balance, 10) > 0;
  return hasNFT;
};

export const getNFTMetadata = async (contractAddress, tokenId) => {
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
  const { account, artistStyle, setArtistStyle } = useContext(AccountContext);
  const [nftData, setNftData] = useState(null);

  useEffect(() => {
    if (!account) {
      return;
    }
    const fetchNFTs = async () => {
      const fetchedNftData = [];

      for (let i = 0; i < artistNFTs.length; i++) {
        try {
          const hasNFT = await checkHasNFT(
            account,
            artistNFTs[i].contractAddress,
            artistNFTs[i].tokenId
          );
          if (hasNFT) {
            const metadata = await getNFTMetadata(
              artistNFTs[i].contractAddress,
              artistNFTs[i].tokenId
            );
            fetchedNftData.push({ artistNFTIdx: i, metadata: metadata });
          }
        } catch (error) {
          console.error("An error occurred:", error);
        }
      }

      setNftData(fetchedNftData);
    };

    fetchNFTs();
  }, [account]);

  const handleImageClick = (artistNFTIdx) => {
    if (artistStyle === artistNFTs[artistNFTIdx].artist) {
      setArtistStyle(null);
    } else {
      setArtistStyle(artistNFTs[artistNFTIdx].artist);
    }
  };

  return (
    <div className="art-selection-container">
      {!nftData ? (
        <p>Checking...</p>
      ) : (
        nftData.map((data, index) => (
          <div
            key={index}
            className={`art-selection-image ${
              artistStyle === artistNFTs[data.artistNFTIdx].artist
                ? "art-selection-image-selected"
                : ""
            }`}
            onClick={() => handleImageClick(data.artistNFTIdx)}
          >
            <img src={data.metadata.image_url} alt="NFT" />
          </div>
        ))
      )}
    </div>
  );
};
