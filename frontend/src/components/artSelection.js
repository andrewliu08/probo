import React, { useState } from 'react';

import vvg from './vvg.png';
import ldv from './ldv.png';
import cm from './cm.png';
import jv from './jv.png';
import rb from './rb.png';
import pablo from './pablo.png';

export const ArtSelection = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [vvg, ldv, cm, jv, rb, pablo];

  const handleImageClick = (image) => {
    if (selectedImage === image) {
      setSelectedImage(null);
    } else {
      setSelectedImage(image);
    }
  };

  return (
    <div className="art-selection-container">
      {images.map((image) => (
        <div
          key={image}
          className={`art-selection-image ${selectedImage === image ? 'art-selection-image-selected' : ''}`}
          onClick={() => handleImageClick(image)}
        >
          <img src={image} alt={image} />
        </div>
      ))}
    </div>
  );
};
