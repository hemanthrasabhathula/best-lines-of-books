import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBookById } from "../../services/BookService";
import { Book } from "../../types/Book";
import { Col, Container, Fade, Row, Spinner } from "react-bootstrap";
import BookDetails from "../BookDetails/BookDetails";
import BreadcrumbComp from "../common/BreadcrumbComp";
import ToastItem from "../common/ToastItem";
import BookQuotes from "../BookQuotes/BookQuotes";
import { ScrollUpDown } from "../common/ScrollUpDown";

const BookPage = () => {
  const location = useLocation();
  const { bookId } = useParams<{ bookId: string }>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "", // e.g., 'success', 'error', etc.
  });
  const [showToast, setShowToast] = useState(false);
  const toggleShowtoast = () => setShowToast(!showToast);
  const fetchBookData = (bookid: string) => {
    fetchBookById(bookid)
      .then((response) => {
        if (response.status != 200 || !response.data) {
          setError("Error fetching Book Data");
          setLoading(false);
          setToastObject({
            heading: "Error",
            message: response.message,
            variant: "danger",
          });
          setShowToast(true);
          throw Error("Error fetching Book");
        }
        const book_data = response.data as Book;
        setError(null);
        setLoading(false);
        setBook(book_data);
      })
      .catch((error: Error) => {
        setError("Error fetching Book Data");
        setLoading(false);
        setToastObject({
          heading: "Error",
          message: error.message,
          variant: "danger",
        });
        setShowToast(true);
        console.log("Error fetching Book", error);
      });
  };
  const [book, setBook] = useState<Book | null>(location.state?.book || null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (bookId && (!location.state || !location.state.book))
      fetchBookData(bookId);

    if (book) {
      setError(null);
      setLoading(false);
    }
  }, [bookId, location.state?.book]);

  return (
    <>
      <>
        {book && !loading && error == null ? (
          <>
            <BookDetails book={book} />
            {bookId && <BookQuotes bookId={bookId} />}
            <ScrollUpDown scrollDown={true} />
            {/* <a
              className={`go-to-down d-flex justify-content-center align-items-center ${
                scrollActive ? "active" : ""
              } `}
              onClick={scrollToDown}
            >
              <i className="bi bi-arrow-down-short"></i>
            </a> */}
          </>
        ) : (
          <Fade appear in={true}>
            <>
              <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <BreadcrumbComp active={"Book"} />
                <Row className="justify-content-evenly">
                  <Col lg="auto" md="auto" xs="auto" sm="auto">
                    {loading ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                          {/* <h2 style={{ marginLeft: "10px" }}>Loading</h2> */}
                        </div>
                      </>
                    ) : (
                      error != null && <h2>{error}</h2>
                    )}
                  </Col>
                </Row>
              </Container>
            </>
          </Fade>
        )}
      </>

      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

export default BookPage;
