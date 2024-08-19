import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = (props: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        className="bg-body-tertiary"
        data-bs-theme="dark"
        style={{ backgroundColor: "transparent !important" }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/best-lines-of-books">
            {`{BLOB}`}{" "}
            <span style={{ fontSize: "0.8rem" }}>BestLinesOfBooks </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link eventKey={1} as={Link} to="/best-lines-of-books/books">
                Books
              </Nav.Link>

              <Nav.Link
                eventKey={3}
                as={Link}
                to="/best-lines-of-books/addbook"
              >
                Add Book
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link eventKey={4} as={Link} to="/best-lines-of-books/about">
                About
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {props.children}
    </div>
  );
};

export default NavBar;
