import { useEffect, useState } from "react";
import { Quotes } from "../../types/Quotes";
import { generateRandomGradient } from "../../utils/Helper";
import { fetchQuotesByBookId } from "../../services/QuotesService";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TypingEffect from "../common/TypingEffect";
import { ReactComponent as RightArrowCurve } from "../../assets/icons/arrow-right-curve.svg";
import { ReactComponent as LeftArrowCurve } from "../../assets/icons/arrow-left-curve.svg";
import "./BookQuotes.css";
import { useQuery } from "@tanstack/react-query";
import { images } from "../../utils/ImagesImporter";

// const backgrounds = [
//   "https://artfiles.alphacoders.com/161/161120.png",
//   "https://images4.alphacoders.com/135/1354110.jpeg",
//   "https://images6.alphacoders.com/137/1371030.png",
//   "https://images8.alphacoders.com/134/1341526.png",
//   "https://picfiles.alphacoders.com/272/272298.jpg",
//   "https://images3.alphacoders.com/133/1337500.png",
//   "https://images.alphacoders.com/135/1353903.png",
//   "https://picfiles.alphacoders.com/297/297690.jpg",
//   "https://images2.alphacoders.com/958/958074.jpg",
//   "https://images2.alphacoders.com/485/485874.jpg",
//   "https://picfiles.alphacoders.com/285/285560.jpg",
//   "https://images.alphacoders.com/134/1345265.png",
//   "https://images4.alphacoders.com/133/1338265.png",
//   "https://picfiles.alphacoders.com/585/585061.jpg",
//   "https://images7.alphacoders.com/135/1358329.png",
//   "https://images.alphacoders.com/137/1370942.png",
//   "https://images8.alphacoders.com/136/1363709.png",
//   "https://images6.alphacoders.com/133/1331485.png",
//   "https://images5.alphacoders.com/133/1337542.png",
// ];

const backgrounds = images;
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

  const { data, error, isLoading, isFetching, isStale, isFetched, isError } =
    useQuery({
      queryKey: ["bookQuotes", bookId],
      queryFn: () => fetchQuotesByBookId(bookId),
      staleTime: 30 * 60 * 1000, //half an hour in ms ,
    });

  useEffect(() => {
    // if (bookId) getQuotesFromService(bookId);

    if (data) {
      const quotes_data = data.data as Quotes[];
      setBookQuotes(quotes_data);
      setBookName(quotes_data[0].bookTitle);
    }
    console.log("Error", error);
    console.log("isError", isError);
    console.log("Is data stale?", isStale);
    console.log("Is data fetched?", isFetched);
    console.log("Is loading?", isLoading);
    console.log("Is fetching?", isFetching);
  }, [isLoading, error, data, isStale, isFetched, isError]);

  const generateRandomBackground = () => {
    return backgrounds[Math.floor(Math.random() * backgrounds.length)];
  };

  const [nextBackground, setNextBackground] = useState<string>("");
  const [currentBackground, setCurrentBackground] = useState<string>("");

  useEffect(() => {
    setCurrentBackground(generateRandomBackground());
    preLoadNextBackground();
  }, []);

  const preLoadNextBackground = () => {
    const img = new Image();
    let randomBackground = "";
    do {
      randomBackground = generateRandomBackground();
    } while (randomBackground === currentBackground);

    console.log("Next Background", randomBackground);
    img.src = randomBackground;
    img.onload = () => {
      setNextBackground(randomBackground);
    };
  };

  // useEffect(() => {
  //   const img = new Image();
  //   img.src = nextBackground;
  // }, [nextBackground]);

  const handleNext = () => {
    if (bookQuotes != undefined && count + 1 > bookQuotes.length - 1) {
      setcount(0);
    } else {
      setcount(count + 1);
    }

    setCurrentBackground(nextBackground);
    preLoadNextBackground();
    //changeGradient();
    // const newBackground = generateRandomBackground();
    // const img = new Image();
    // img.src = newBackground;
    // img.onload = () => {
    //   setCurrentBackground((prev) =>
    //     prev !== newBackground ? newBackground : generateRandomBackground()
    //   );
    //   setNextBackground(generateRandomBackground());
    // };

    //setBackground(generateRandomBackground());
  };

  const handlePrev = () => {
    if (bookQuotes != undefined && count - 1 < 0) {
      setcount(bookQuotes.length - 1);
    } else {
      setcount(count - 1);
    }
    setCurrentBackground(nextBackground);
    preLoadNextBackground();
    //changeGradient();
    // const newBackground = generateRandomBackground();
    // const img = new Image();
    // img.src = newBackground;
    // img.onload = () => {
    //   setCurrentBackground((prev) =>
    //     prev !== newBackground ? newBackground : generateRandomBackground()
    //   );
    //   setNextBackground(generateRandomBackground());
    // };
    //setBackground(generateRandomBackground());
  };
  return (
    <>
      {bookQuotes != undefined && bookQuotes.length > 0 ? (
        <div
          className="book-lines-bg"
          style={{
            // position: "relative",
            //overflow: "hidden",
            backgroundImage: `url(${currentBackground})`,
            backgroundSize: "cover",
            // backgroundPosition: "center",
            // backgroundRepeat: "no-repeat",
            transition: "background-image 0.5s ease-in-out",
            //filter: "blur(4px)",
          }}
        >
          {/* <div
            className="background-blur"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "background-image 0.5s",
              filter: "blur(4px)",
              zIndex: -2,
            }}
          ></div>
          <div
            className="black-overlay"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent black
              zIndex: -1,
            }}
          ></div> */}
          <Container>
            {/* <Row
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
            </Row> */}
            <Row className="justify-content-center" style={{ padding: "5px" }}>
              <Col
                lg="auto"
                sm="auto"
                md="auto"
                xs="auto"
                className="align-content-center"
                style={{ maxWidth: "100%" }}
              >
                <Card
                  className="card-frost"
                  style={{
                    width: "34rem",
                    maxWidth: "100%",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontSize: "1.3rem",
                        fontFamily: "sans-serif",
                        textWrap: "pretty",
                        minHeight: "1.7rem",
                        textAlign: "center",
                        padding: "15px",
                      }}
                    >
                      <i>
                        <TypingEffect text={bookName}></TypingEffect>
                      </i>
                    </Card.Text>

                    <Card.Text
                      style={{
                        fontSize: "1.1rem",
                        fontFamily: "Georgia, serif",
                        textWrap: "pretty",
                        minHeight: "5rem",
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

                    <Card.Text style={{ textAlign: "center" }}>
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
                          marginRight: "12px",
                          background: "transparent",
                        }}
                      >
                        <LeftArrowCurve
                          style={{
                            width: "46px",
                            height: "46px",
                          }}
                        />
                      </Button>
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
                          marginLeft: "12px",
                          background: "transparent",
                        }}
                      >
                        <RightArrowCurve
                          style={{ width: "46px", height: "46px" }}
                        />
                      </Button>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {/* <Row
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
            </Row> */}
          </Container>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default BookQuotes;
