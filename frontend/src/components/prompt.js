import React, { useState } from "react";
import { imageFromTextPrompt } from "../api";

export const TextPromptForm = () => {
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await imageFromTextPrompt(prompt);
    console.log(response);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};