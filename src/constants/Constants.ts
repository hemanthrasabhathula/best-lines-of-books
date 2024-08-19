export const API_ENDPOINT = "http://localhost:5000/api";

export const BOOKS_LIST = "bookslist";
export const BRANCHES_LIST = "brancheslist";
export const CART_ITEMS = "cartitems";
export const TIMESTAMP = "timestamp";
export const BOOKS = "books";
export const BRANCHES = "branches";
export const CART = "cart";
export const BOOKS_URL = `${API_ENDPOINT}/books`;
export const BRANCHES_URL = `${API_ENDPOINT}/branches`;
export const CART_URL = `${API_ENDPOINT}/cart`;
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const BOOK_INFO_PROMPT =
  "Provide the book details for :your-book-title in a single-line JSON format without any extra text or newline characters. The JSON should include fields: title, author, ISBN (in the format 123-123456789), genre (comma seperated string), published (only year), pages,image and description (The description should be a brief paragraph giving a glimpse of what the book is about, with at least 6 lines and no more than 8 lines should not include special characters).";

export const SESSION_KEY = "userSession";

const fifteen_min = 1000 * 60 * 15;
export const SESSION_TIMEOUT = fifteen_min;

export const colors = [
  "#FFDFD6",
  "#FFFBF5",
  "#FEFAF6",
  "#FFF8E3",
  "#F9DBBA",
  "#F7EFE5",
  "#F5EEE6",
  "#F3D7CA",
  "#F5EEE6",
  "#EADBC8",
  "#E7E8D8",
  "#E6A4B4",
  "#E3A5C7",
  "#E2BFD9",
  "#DAC0A3",
  "#D7D7D8",
  "#D3B1AB",
  "#C8A1E0",
  "#B692C2",
  "#BB9AB1",
  "#B5CFB7",
  "#BC9F8B",
  "#987D9A",
  "#8E7AB5",
  "#74512D",
  "#694F8E",
  "#674188",
  "#102C57",
  "#8E7AB5",
];
