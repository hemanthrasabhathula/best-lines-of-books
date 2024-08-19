import { GROQ_API_URL } from "../constants/Constants";
import { AIAPIRequest } from "../types/AIAPIRequest";

export const fetchPromptResponse = async (
  data: AIAPIRequest
): Promise<string> => {
  try {
    const groq_api_key = process.env.REACT_APP_GROQ_API_KEY;
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groq_api_key}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    return json.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching Prompt response", error);
    throw error;
  }
};
