import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchBookById } from "../../services/BookService";
import { Book } from "../../types/Book";
import { colors } from "../../constants/Constants";
import { generateRandomGradient } from "../../utils/Helper";
import { Col, Container, Fade, Image, Row, Spinner } from "react-bootstrap";
import BreadcrumbComp from "../common/BreadcrumbComp";
import ToastItem from "../common/ToastItem";
import "./BookDetails.css";

const BookDetails = ({ book }: { book: Book }) => {
  const [gradient, setGradient] = useState(generateRandomGradient());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Fade appear in={true}>
        <div
          style={{
            background: gradient,
          }}
        >
          <Container
            className="container-height"
            style={{ paddingTop: "20px", paddingBottom: "20px" }}
          >
            <BreadcrumbComp active={"Book"} />
            <Row id="image" className="justify-content-center">
              <Col
                lg="auto"
                md="auto"
                xs="auto"
                sm="auto"
                style={{ alignContent: "center", paddingTop: "40px" }}
                onClick={() => (window.location.href = book.image)}
              >
                <Image
                  rounded
                  style={{
                    width: "200px",
                    aspectRatio: "2/3",
                    objectFit: "cover",
                    boxShadow: "0 7px 30px rgba(0, 0, 0, 0.3)",
                  }}
                  src={book.image}
                  alt={book.title}
                />
              </Col>
              <Col
                id="details"
                lg="auto"
                md="auto"
                xs="auto"
                sm="auto"
                // className="justify-content-center"
                style={{
                  alignContent: "center",
                }}
              >
                {/* <div>
                  <Row> */}
                <div className="book-details-container">
                  <div>
                    <b>{book.title}</b>
                  </div>
                  <div>{`Author: ${book.author}`}</div>
                  <div>{`ISBN: ${book.ISBN}`}</div>
                  <div>{`Genre: ${book.genre}`}</div>
                  <div>{`Published: ${book.published}`}</div>
                  <div>{`Pages: ${book.pages}`}</div>
                </div>
              </Col>
            </Row>
            <Row
              className="justify-content-center mt-3"
              style={{ padding: "30px" }}
            >
              <Col lg="8">
                <div>
                  <p>
                    <span className={isExpanded ? "" : "truncate-text"}>
                      {book.description && <b>Description: </b>}
                      {book.description}
                    </span>

                    {isExpanded && (
                      <p className="show-less" onClick={toggleIsExpanded}>
                        <i> show less</i>
                      </p>
                    )}
                    {!isExpanded && (
                      <p className="read-more" onClick={toggleIsExpanded}>
                        <i> read more</i>
                      </p>
                    )}
                  </p>
                  {/* This book tells the
                  story of two dads, one rich and one poor, and how they teach
                  their sons different and opposing financial philosophies. It
                  explores how traditional education does not cover financial
                  literacy, and how most people live paycheque to paycheque
                  without ever achieving financial freedom. The book encourages
                  readers to think differently about money and teaches financial
                  independence. The rich dad's philosophy emphasizes the
                  importance of having multiple streams of income, building
                  assets, and working to make money work for you, rather than
                  working for money. The poor dad's philosophy prioritizes
                  saving and being thrifty. The book is written in an
                  easy-to-understand style, making it accessible to a wide range
                  of readers. */}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Fade>
    </>
  );
};

export default BookDetails;
