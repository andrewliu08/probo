const BACKEND_URL = "http://127.0.0.1:5000";

export const imageFromTextPrompt = async (prompt) => {
  try {
    const response = await fetch(`${BACKEND_URL}/text_prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
      responseType: "blob",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const imageFromImagePrompt = async (prompt) => {
  try {
    const response = await fetch(`${BACKEND_URL}/image_prompt`, {
      method: "POST",
      body: prompt,
      responseType: "blob",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch image");
    }

    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
