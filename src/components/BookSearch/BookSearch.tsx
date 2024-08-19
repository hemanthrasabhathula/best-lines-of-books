import { Button, Form, InputGroup } from "react-bootstrap";

const BookSearch = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}: {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Form onSubmit={onSearchSubmit}>
      <InputGroup className="mb-3 mt-4" onSubmit={onSearchSubmit}>
        <Form.Control
          type="text"
          placeholder="Search Book ..."
          aria-label="Search-Book"
          aria-describedby="input-search"
          onChange={onSearchInput}
          value={searchTerm}
          id="input-search"
          style={{ background: "transparent" }}
        />
        <Button type="submit" variant="outline-primary" id="search-button">
          Search
        </Button>
      </InputGroup>
    </Form>
  );
};

export default BookSearch;
