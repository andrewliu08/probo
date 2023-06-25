import React, { useContext, useState } from "react";
import AccountContext from "../context";
import { ColorRing } from "react-loader-spinner";

import andrew from "./andrew.png"
import vvg from "./vvg.png";
import ldv from "./ldv.png";
import jv from "./jv.png";
import rb from "./rb.png";
import pablo from "./pablo.png";

export const FloatingImages = () => {
  const { uniqueImage, isGeneratingImage } = useContext(AccountContext);
  const imageSources = [vvg, ldv, jv, rb, pablo, andrew];

  const [images, setImages] = useState(
    imageSources.map((src, index) => ({
      id: index + 1,
      top: Math.floor(Math.random() * 450) + 20,
      left: Math.floor(Math.random() * 800) + 50,
      direction: index % 2 === 0 ? 1 : -1,
      src: src,
    }))
  );

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
      {isGeneratingImage ? (
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
