import React, { useState } from 'react';

import vvg from './vvg.png';
import ldv from './ldv.png';
import cm from './cm.png';
import jv from './jv.png';
import rb from './rb.png';
import pablo from './pablo.png';

export const ArtSelection = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const images = [vvg, ldv, cm, jv, rb, pablo];

  const handleImageClick = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((selectedImage) => selectedImage !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  return (
    <div className="art-selection-container">
      {images.map((image) => (
        <div
          key={image}
          className={`art-selection-image ${selectedImages.includes(image) ? 'art-selection-image-selected' : ''}`}
          onClick={() => handleImageClick(image)}
        >
          <img src={image} alt={image} />
        </div>
      ))}
    </div>
  );
};
