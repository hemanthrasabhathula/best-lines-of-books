import { Book } from "./Book";

export type BookContextType = {
  books: Book[];
  addBooks: (book: Book[]) => void;
  clearData: () => void;
};
