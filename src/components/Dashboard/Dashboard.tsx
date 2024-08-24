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
import { useQuery } from "@tanstack/react-query";
import { ScrollUpDown } from "../common/ScrollUpDown";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { books, addBooks } = useBookContext();
  // const [error, setError] = useState<string>("");
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

  const { data, error, isLoading, isFetching, isStale, isFetched, isError } =
    useQuery({
      queryKey: ["books"],
      queryFn: fetchAllBooks,
      staleTime: 30 * 60 * 1000, //half an hour in ms ,
    });

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    } else if (error) {
      console.log("Error fetching books", error);
    } else if (data) {
      addBooks(data.data);
      setLoading(false);
    }
    console.log("Error", error);
    console.log("isError", isError);
    console.log("Is data stale?", isStale);
    console.log("Is data fetched?", isFetched);
    console.log("Is loading?", isLoading);
    console.log("Is fetching?", isFetching);
  }, [isLoading, error, data, isStale, isFetched, isError]);

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

            {!isLoading && isFetched && !isError ? (
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
                  {!isLoading && isError ? (
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
          <ScrollUpDown scrollDown={false}></ScrollUpDown>
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
