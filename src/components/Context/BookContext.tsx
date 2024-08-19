import { createContext, useContext, useEffect, useState } from "react";
import { BookContextType } from "../../types/BookContext";
import { Book } from "../../types/Book";

import { BOOKS_LIST } from "../../constants/Constants";
import StorageService from "../../services/StorageService";

const BookContext = createContext<BookContextType | undefined>(undefined);

const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    console.log("BookProvider useEffect default fetch");

    if (books.length === 0) {
      const booksList = StorageService.getBooks(BOOKS_LIST);
      if (booksList.length !== 0) setBooks(booksList);
    }
  }, []);

  useEffect(() => {
    if (books.length !== 0) StorageService.setItem(BOOKS_LIST, books);
  }, [books]);

  const addBooks = (book: Book | Book[]) => {
    if (Array.isArray(book)) {
      setBooks((prevBooks) => [...prevBooks, ...book]);
    } else {
      setBooks((prevBooks) => [...prevBooks, book]);
    }
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
