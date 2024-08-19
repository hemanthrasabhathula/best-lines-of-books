import { IdObj } from "./IdObj";

export type Quotes = {
  _id?: IdObj;
  quote: string;
  page: string;
  chapter: string;
  bookId?: IdObj;
  bookTitle: string;
};
