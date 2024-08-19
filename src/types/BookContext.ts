import { Book } from "./Book";

export type BookContextType = {
  books: Book[];
  addBooks: (book: Book | Book[]) => void;
  clearData: () => void;
};
