import { Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Book } from "../../types/Book";

const BookItem = ({ bookslist }: { bookslist: Book[] }) => {
  const navigate = useNavigate();
  // const { bookslist } = useBooks();

  // console.log("BooksList", bookslist);
  return (
    <>
      {bookslist.length > 1 && <h2 className="mb-3"> All Books</h2>}
      {bookslist.length === 0 && <h2 className="mb-3"> No Books Found</h2>}
      {bookslist.length === 1 && <h2 className="mb-3"> Book Found</h2>}
      {bookslist.map((book) => (
        <Col
          xs={4}
          sm={4}
          md={3}
          lg={2}
          key={book._id.$oid}
          className="mt-3 mb-4"
        >
          <div>
            <div
              onClick={() =>
                navigate(`/book/${book._id.$oid}`, {
                  state: { book },
                })
              }
            >
              <Image
                rounded
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "2/3",
                  objectFit: "cover",
                  cursor: "pointer",
                }} // Set width to 100%, height to auto, and aspectRatio to maintain a 2:3 ratio for all images -
                src={book.image}
                alt={book.title}
              />
            </div>
            <div className="mt-2" style={{ textAlign: "center" }}>
              {book.title}
            </div>
          </div>
        </Col>
      ))}
    </>
  );
};

export default BookItem;
