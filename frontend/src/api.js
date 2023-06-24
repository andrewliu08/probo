const BACKEND_URL = "http://127.0.0.1:5000";

export const imageFromTextPrompt = async (prompt) => {
  try {
    const response = await fetch(`${BACKEND_URL}/text_prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
