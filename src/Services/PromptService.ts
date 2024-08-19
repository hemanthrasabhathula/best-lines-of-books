import { AIAPIRequest } from "../types/AIAPIRequest";

export const fetchPromptResponse = async (
  data: AIAPIRequest
): Promise<string> => {
  try {
    const groq_api_url = process.env.REACT_APP_GROQ_API_URL;
    const groq_api_key = process.env.REACT_APP_GROQ_API_KEY;
    if (!groq_api_url) throw new Error("API URL not found");
    if (!groq_api_key) throw new Error("API Key is missing");
    const response = await fetch(groq_api_url, {
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
