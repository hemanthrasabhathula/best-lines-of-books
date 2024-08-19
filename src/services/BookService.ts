import { API_ENDPOINT } from "../constants/Constants";
import { APIResponse } from "../types/APIResponse";
import { Book, FormBookType } from "../types/Book";

export const fetchAllBooks = async (): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const api_data = (await response.json()) as APIResponse;
    if (response.status !== 200) {
      throw new Error(api_data.message);
    }
    api_data.status = response.status;
    return api_data;
  } catch (error) {
    console.log("Error fetching user", error);
    throw error;
  }
};

export const fetchBookById = async (bookId: string): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/book/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const api_data = (await response.json()) as APIResponse;
    if (response.status !== 200) {
      throw new Error(api_data.message);
    }
    //const api_data = (await response.json()) as APIResponse;
    api_data.status = response.status;
    return api_data;
  } catch (error) {
    console.log("Error registering user", error);
    throw error;
  }
};

export const addBook = async (bookData: FormBookType): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    const api_data = (await response.json()) as APIResponse;
    if (response.status !== 201 && response.status !== 200) {
      throw new Error(api_data.message);
    }
    //const api_data = (await response.json()) as APIResponse;
    api_data.status = response.status;
    return api_data;
  } catch (error) {
    console.error("Error adding branch", error);
    throw error;
  }
};
