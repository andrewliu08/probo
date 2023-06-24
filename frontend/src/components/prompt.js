import React, { useState } from "react";
import { imageFromImagePrompt } from "../api";
import { ColorRing } from "react-loader-spinner";

export const TextPromptForm = () => {
  // TODO: I put the returned image in this component
  // but should probably put it in a separate component.
  // Not sure how to pass the returned image from the api call
  // to the component that renders the image.
  const [isLoading, setIsLoading] = useState(false);
  const [imagePrompt, setImagePrompt] = useState(null); // preview upload image
  const [imageFile, setImageFile] = useState(null); // image sent to backend
  const [responseImage, setResponseImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePrompt(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      // const response = await fetch("http://127.0.0.1:5000/image_prompt", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!response.ok) {
      //   throw new Error("Network response was not ok");
      // }

      const imageURL = await imageFromImagePrompt(formData);
      setResponseImage(imageURL);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Image Upload Prompt */}
        <input type="file" onChange={handleImageUpload} />
        {imagePrompt && (
          <div className="image-prompt-container">
            <img src={imagePrompt} alt="Prompt" className="image-prompt" />
          </div>
        )}

        {/* Submit Prompt */}
        <button type="submit">Submit</button>
      </form>
      {/* Display submit data */}
      <p>
        {isLoading ? (
          <ColorRing
            visible={true}
            height="180"
            width="180"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#FFFF00", "#ED1C24", "#0476C0", "#333333", "#57DBF2"]}
          />
        ) : (
          responseImage && <img src={responseImage} alt="" />
        )}
      </p>
    </div>
  );
};
