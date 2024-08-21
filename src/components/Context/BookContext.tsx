import { createContext, useContext, useEffect, useState } from "react";
import { BookContextType } from "../../types/BookContext";
import { Book } from "../../types/Book";

import { BOOKS_LIST } from "../../constants/Constants";
import StorageService from "../../services/StorageService";

const BookContext = createContext<BookContextType | undefined>(undefined);

const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  const addBooks = (books: Book[]) => {
    setBooks(books);
  };

  const clearData = () => {
    setBooks([]);
    StorageService.removeItem(BOOKS_LIST);
  };

  return (
    <BookContext.Provider value={{ books, addBooks, clearData }}>
      {children}
    </BookContext.Provider>
  );
};

const useBookContext = () => {
  const context = useContext(BookContext);
  if (context === undefined) {
    throw new Error("useBookContext must be used within a BookProvider");
  }

  return context;
};

export { BookProvider, useBookContext };
