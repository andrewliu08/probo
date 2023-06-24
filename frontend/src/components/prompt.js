import React, { useState } from "react";
import { imageFromTextPrompt } from "../api";
import { ColorRing } from 'react-loader-spinner'

export const TextPromptForm = () => {
  const [post, setPost] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [imagePrompt, setImagePrompt] = useState(null);
  const [prompt, setPrompt] = useState("");

  // Text Prompt
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await imageFromTextPrompt(prompt);
    console.log(response);
    setPost(response.result);

    setIsLoading(false);
  };

  // Image Prompt
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImagePrompt(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Text Prompt */}
        <input type="text" value={prompt} onChange={handleInputChange} />

        {/* Image Upload Prompt */}
        <input type="file" onChange={handleImageUpload} />
        {imagePrompt && (
          <div className="image-prompt-container">
            <img
              src={imagePrompt}
              alt="Prompt"
              className="image-prompt"
            />
          </div>
        )}

        {/* Submit Prompt */}
        <button type="submit">Submit</button>

        {/* Display submit data */}
        <p>{isLoading ?

          <ColorRing
            visible={true}
            height="180"
            width="180"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#FFFF00', '#ED1C24', '#0476C0', '#333333', '#57DBF2']}
          />

          : post ? post : ""}</p>
      </form>
    </div>
  );
};