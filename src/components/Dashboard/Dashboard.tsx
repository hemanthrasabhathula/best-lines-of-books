import { Container, Fade, Row } from "react-bootstrap";
import BookSearch from "../BookSearch/BookSearch";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useBookContext } from "../Context/BookContext";
import { Book } from "../../types/Book";
import StorageService from "../../Services/StorageService";
import { BOOKS_LIST } from "../../constants/Constants";
import { fetchAllBooks } from "../../Services/BookService";
import BookItem from "../BookItem/BookItem";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { books, addBooks } = useBookContext();

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Clicked on Submit with ", searchTerm);
    setSearchTerm(searchTerm);
  };
  const filteredBooks: Book[] = books.filter((book) =>
    book.title
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(searchTerm.replaceAll(" ", "").toLowerCase())
  );

  useEffect(() => {
    if (books.length === 0) {
      if (StorageService.getBooks(BOOKS_LIST).length === 0) {
        fetchAllBooks()
          .then((response) => {
            if (response.status !== 200 || !response.data) {
              throw Error("Error fetching books");
            }
            const fetchedBooks = response.data as Book[];
            addBooks(fetchedBooks);
          })
          .catch((error: Error) => {
            console.log("Error fetching books", error.message);
          });
      } else addBooks(StorageService.getBooks(BOOKS_LIST));
    }
  }, []);

  return (
    <div style={{ background: "#EDF9FC" }}>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px" }}>
          <Row lg={2} sm={1} className="justify-content-center">
            <BookSearch
              searchTerm={searchTerm}
              onSearchInput={handleSearchInput}
              onSearchSubmit={handleSearchSubmit}
            />
          </Row>
          <Row>
            {filteredBooks.length === 0 ? ( // If no books are found, display a message to the user
              <h2>No books found</h2>
            ) : (
              <BookItem bookslist={filteredBooks} />
            )}
          </Row>
        </Container>
      </Fade>
    </div>
  );
};

export default Dashboard;
