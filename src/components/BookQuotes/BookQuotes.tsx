import { useEffect, useState } from "react";
import { Quotes } from "../../types/Quotes";
import { generateRandomGradient } from "../../utils/Helper";
import { fetchQuotesByBookId } from "../../Services/QuotesService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TypingEffect from "../common/TypingEffect";
import { ReactComponent as RightArrowCurve } from "../../assets/icons/arrow-right-curve.svg";
import { ReactComponent as LeftArrowCurve } from "../../assets/icons/arrow-left-curve.svg";
import "./BookQuotes.css";

const BookQuotes = ({ bookId }: { bookId: string }) => {
  const [bookQuotes, setBookQuotes] = useState<Quotes[] | undefined>();
  const [bookName, setBookName] = useState<string>("");
  const [count, setcount] = useState(0);
  const [gradient, setGradient] = useState(generateRandomGradient());
  const changeGradient = () => {
    setGradient(generateRandomGradient());
  };

  const getQuotesFromService = (bookId: string) => {
    fetchQuotesByBookId(bookId)
      .then((response) => {
        if (response.status != 200 || !response.data) {
          throw Error("Error fetching Quotes");
        }

        const quotes_data = response.data as Quotes[];
        setBookQuotes(quotes_data);
        setBookName(quotes_data[0].bookTitle);
      })
      .catch((error: Error) => {
        console.log("Error logging in", error);
      });
  };

  const handleNext = () => {
    if (bookQuotes != undefined && count + 1 > bookQuotes.length - 1) {
      setcount(0);
    } else {
      setcount(count + 1);
    }
    changeGradient();
  };

  const handlePrev = () => {
    if (bookQuotes != undefined && count - 1 < 0) {
      setcount(bookQuotes.length - 1);
    } else {
      setcount(count - 1);
    }
    changeGradient();
  };

  useEffect(() => {
    if (bookId) getQuotesFromService(bookId);
  }, []);

  return (
    <>
      {bookQuotes != undefined && bookQuotes.length > 0 ? (
        <div
          className="book-lines-bg"
          style={{
            background: gradient,
          }}
        >
          <Container>
            <Row
              className="justify-content-center mb-5"
              style={{ padding: "5px", height: "2rem" }}
            >
              <Col
                lg="auto"
                sm="auto"
                md="auto"
                xs="auto"
                className="align-content-center"
              >
                <div
                  style={{
                    fontSize: "1.3rem",
                    fontFamily: "sans-serif",
                    textWrap: "pretty",
                    minHeight: "1.7rem",
                  }}
                >
                  <i>
                    <TypingEffect text={bookName}></TypingEffect>
                  </i>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center" style={{ padding: "5px" }}>
              <Card className="card-frost" style={{ width: "34rem" }}>
                <Card.Body>
                  <Card.Text
                    style={{
                      fontSize: "1.1rem",
                      fontFamily: "Georgia, serif",
                      textWrap: "pretty",
                    }}
                  >
                    <i>
                      " {bookQuotes[count].quote}"
                      {/* "Some quick example text to build on the card title and make
                  up the bulk of the card's content." */}
                    </i>
                  </Card.Text>
                  <Card.Text style={{ textAlign: "end", fontSize: "12px" }}>
                    {`Page ${bookQuotes[count].page} | Chapter ${bookQuotes[count].chapter}`}
                  </Card.Text>
                  {/* <Button >Change Background</Button> */}
                </Card.Body>
              </Card>
            </Row>
            <Row
              className="justify-content-center mt-1"
              style={{ padding: "5px" }}
            >
              <Col
                lg="auto"
                sm="auto"
                md="auto"
                xs="auto"
                className="align-content-center"
              >
                <Button
                  variant="dark"
                  onClick={handlePrev}
                  style={{
                    borderRadius: "50%",
                    border: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    padding: "0",
                    margin: "0",
                    background: "transparent",
                  }}
                >
                  <LeftArrowCurve style={{ width: "46px", height: "46px" }} />
                </Button>
              </Col>
              <Col
                lg="auto"
                sm="auto"
                md="auto"
                xs="auto"
                className="align-content-center"
              >
                <Button
                  variant="dark"
                  onClick={handleNext}
                  style={{
                    borderRadius: "50%",
                    border: "none",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    height: "40px",
                    padding: "0",
                    margin: "0",
                    background: "transparent",
                  }}
                >
                  <RightArrowCurve style={{ width: "46px", height: "46px" }} />
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BookQuotes;
