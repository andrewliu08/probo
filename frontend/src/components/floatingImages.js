import React, { useContext, useEffect, useState } from "react";
import AccountContext from "../context";
import { ColorRing } from "react-loader-spinner";
import { checkHasNFT, getNFTMetadata, proboNFTs } from "./displayNFT";

import andrew from "../assets/landscapes/andrew.png";
import andy from "../assets/landscapes/andy.png";
import edward from "../assets/landscapes/edward.png";
import amir from "../assets/landscapes/amir.png";
import ian from "../assets/landscapes/WC-1.png";
import wc2 from "../assets/landscapes/WC-2.png";

export const FloatingImages = () => {
  const { account, uniqueImage, isGeneratingImage } = useContext(AccountContext);
  const [nftData, setNftData] = useState(null);
  const imageSources = [andrew, edward, andy, amir, ian, wc2];

  const [images, setImages] = useState(
    imageSources.map((src, index) => ({
      id: index + 1,
      top: Math.floor(Math.random() * 375) + 20,
      left: Math.floor(Math.random() * 700) + 50,
      direction: index % 2 === 0 ? 1 : -1,
      src: src,
    }))
  );

  useEffect(() => {
    const fetchNFTs = async () => {
      for (let i = 0; i < proboNFTs.length; i++) {
        try {
          const hasNFT = await checkHasNFT(
            account,
            proboNFTs[i].contractAddress,
            proboNFTs[i].tokenId
          );
          if (hasNFT) {
            const metadata = await getNFTMetadata(
              proboNFTs[i].contractAddress,
              proboNFTs[i].tokenId
            );
            setNftData(metadata);
            return;
          }
        } catch (error) {
          console.error("An error occurred:", error);
          return;
        }
      }
    };

    setNftData(null);
    if (!account) {
      return;
    }
    fetchNFTs();
  }, [account]);

  const updateImagePosition = (id) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id
          ? {
              ...image,
              top: image.top + image.direction,
              left: Math.floor(Math.random() * 500) + 50,
            }
          : image
      )
    );
  };

  return (
    <div className="floating-images-container">
      {images.map((image) => (
        <img
          key={image.id}
          className="floating-image"
          src={image.src}
          alt={`other-users-images-${image.id}`}
          style={{ top: `${image.top}px`, left: `${image.left}px` }}
          onAnimationIteration={() => updateImagePosition(image.id)}
        />
      ))}
      {nftData ? (
        <img
          className="user-unique-image"
          src={nftData.image_url}
          alt="unique-user"
        />
      ) : isGeneratingImage ? (
        <div className="user-unique-image">
          <ColorRing
            visible={true}
            height="360"
            width="360"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FFFF00", "#ED1C24", "#0476C0", "#333333", "#57DBF2"]}
          />
        </div>
      ) : (
        uniqueImage && (
          <img
            className="user-unique-image"
            src={uniqueImage}
            alt="unique-user"
          />
        )
      )}
    </div>
  );
};
