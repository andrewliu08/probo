import React, { useState } from 'react';

import vvg from "./vvg.png";
import ldv from "./ldv.png";
import cm from "./cm.png";
import jv from "./jv.png";
import rb from "./rb.png";
import pablo from "./pablo.png";

export const FloatingImages = () => {
  const imageSources = [vvg, ldv, cm, jv, rb, pablo];

  const [images, setImages] = useState(
    imageSources.map((src, index) => ({
      id: index + 1,
      top: Math.floor(Math.random() * 450) + 15,
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
          alt={`Image ${image.id}`}
          style={{ top: `${image.top}px`, left: `${image.left}px` }}
          onAnimationIteration={() => updateImagePosition(image.id)}
        />
      ))}
    </div>
  );
};
