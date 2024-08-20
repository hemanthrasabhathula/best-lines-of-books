import { Col, Container, Fade, Row, Spinner } from "react-bootstrap";
import BookSearch from "../BookSearch/BookSearch";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useBookContext } from "../Context/BookContext";
import { Book } from "../../types/Book";
import StorageService from "../../services/StorageService";
import { BOOKS_LIST } from "../../constants/Constants";
import { fetchAllBooks } from "../../services/BookService";
import BookItem from "../BookItem/BookItem";
import TypingEffect from "../common/TypingEffect";
import ToastItem from "../common/ToastItem";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { books, addBooks } = useBookContext();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });
  const [showToast, setShowToast] = useState(false);
  const toggleShowtoast = () => setShowToast(!showToast);

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
            setError("");
            setLoading(false);
            const fetchedBooks = response.data as Book[];
            addBooks(fetchedBooks);
          })
          .catch((error: Error) => {
            setError(error.message);
            setLoading(false);
            setToastObject({
              heading: "Error",
              message: "Error Fetching Books.. Please Try again ",
              variant: "danger",
            });
            setShowToast(true);
            console.log("Error fetching books", error.message);
          });
      } else {
        setError("");
        setLoading(false);
        addBooks(StorageService.getBooks(BOOKS_LIST));
      }
    } else {
      setError("");
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ background: "#EDF9FC" }}>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px" }}>
          <>
            <Row lg={2} sm={1} className="justify-content-center">
              <BookSearch
                searchTerm={searchTerm}
                onSearchInput={handleSearchInput}
                onSearchSubmit={handleSearchSubmit}
              />
            </Row>

            {!loading && !error ? (
              <Row>
                {" "}
                <BookItem bookslist={filteredBooks} />{" "}
              </Row>
            ) : (
              <Row
                className="justify-content-center mt-5"
                style={{
                  height: "100vh", // Occupies the full viewport height
                  display: "flex",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
              >
                <Col lg="auto" md="auto" sm="auto" xs="auto">
                  {!loading && error ? (
                    <>
                      <h2 style={{ marginLeft: "10px" }}>
                        Error Fetching Books
                      </h2>
                    </>
                  ) : (
                    <>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <h2 style={{ marginLeft: "10px" }}>Loading... </h2>
                      </div>
                      <div>
                        <TypingEffect text="Waking up the backend... Hang on.."></TypingEffect>
                      </div>
                    </>
                  )}
                </Col>
              </Row>
            )}
            {/* {filteredBooks.length === 0 ? ( // If no books are found, display a message to the user
              <h2>No books found</h2>
            ) : (
              
            )} */}
          </>
        </Container>
      </Fade>
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </div>
  );
};

export default Dashboard;
