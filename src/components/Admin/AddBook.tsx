import {
  Button,
  Col,
  Container,
  Fade,
  FloatingLabel,
  Form,
  Image,
  Spinner,
} from "react-bootstrap";
import "./AddBook.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import imagePlaceHolder from "../../assets/images/image_placeholder.png";

import { ReactComponent as Wand } from "../../assets/icons/magic-wand-2.svg";
import { Book, FormBookType } from "../../types/Book";
import { BOOK_INFO_PROMPT } from "../../constants/Constants";
import { AIAPIRequest } from "../../types/AIAPIRequest";
import { fetchPromptResponse } from "../../services/PromptService";
import { addBook } from "../../services/BookService";
import BreadcrumbComp from "../common/BreadcrumbComp";
import ConfirmationModal from "../common/ConfirmationModal";
import ToastItem from "../common/ToastItem";
import BookDetails from "../BookDetails/BookDetails";

const AddBook = () => {
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormBookType>({
    title: "",
    author: "",
    ISBN: "",
    genre: "",
    published: 0,
    pages: 0,
    image: "",
    description: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastObject, setToastObject] = useState({
    heading: "",
    message: "",
    variant: "",
  });
  const [loadingPrompt, setloadingPrompt] = useState(false);
  const toggleShowtoast = () => setShowToast(!showToast);
  const [srcImg, setSrcImg] = useState<string>(imagePlaceHolder);

  useEffect(() => {
    setSrcImg(formData.image || imagePlaceHolder);
  }, [formData.image]);
  const handleFormData = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      //e.preventDefault();
    }
    setValidated(true);
    const data = new FormData(e.currentTarget);
    console.log("Form Data", data);
    const formDataObj = Object.fromEntries(data.entries());
    console.log("Form Data JSON", JSON.stringify(formDataObj));
    // Validate form data
    const errors: { [key: string]: string } = {};
    if (!formDataObj.title) {
      errors.title = "Title is required";
    }
    if (!formDataObj.author) {
      errors.author = "Author is required";
    }

    if (!formDataObj.ISBN) {
      errors.ISBN = "ISBN is required";
    }

    if (!formDataObj.genre) {
      errors.genre = "Genre is required";
    }

    if (!formDataObj.published) {
      errors.published = "Published is required";
    }

    if (!formDataObj.pages) {
      errors.pages = "Pages is required";
    }

    if (!formDataObj.image) {
      errors.image = "Image is required";
    }

    console.log("formData:: ", formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setShowModal(true);

    console.log("formData to be submitted :: ", formData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === "published" || name === "pages") && value !== "") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePromptGeneration = () => {
    setloadingPrompt(true);
    const message: string = BOOK_INFO_PROMPT.replace(
      "your-book-title",
      formData.title
    );
    const data: AIAPIRequest = {
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: message }],
    };

    fetchPromptResponse(data)
      .then((response) => {
        console.log("Prompt Response", response);
        const generatedData = JSON.parse(response) as FormBookType;
        console.log("Generated Data", generatedData);
        setFormData({
          ...formData,
          title: generatedData.title,
          author: generatedData.author,
          ISBN: generatedData.ISBN,
          genre: generatedData.genre,
          published: generatedData.published,
          pages: generatedData.pages,
          image: generatedData.image,
          description: generatedData.description,
        });
        setloadingPrompt(false);
      })

      .catch((error) => {
        setloadingPrompt(false);
        console.error("Error generating prompt", error);
      });
  };

  const handleOnConfirm = () => {
    setShowModal(false);
    addBook(formData)
      .then((response) => {
        if (response.status !== 201 && response.status !== 200) {
          throw new Error(response.message);
        }

        setFormData({
          title: "",
          author: "",
          ISBN: "",
          genre: "",
          published: 0,
          pages: 0,
          image: "",
          description: "",
        });
        setValidated(false);
        setFormErrors({});
        setShowModal(false);
        setShowToast(true);
        setToastObject({
          heading: "Success",
          message: "Book Added Successfully",
          variant: "success",
        });
        const BookData = response.data as Book;
        console.log("Response", BookData);
      })
      .catch((error) => {
        console.error("Error adding book", error);
        setShowToast(true);
        setToastObject({
          heading: "Error",
          message: "Error Adding Book",
          variant: "danger",
        });
      });
  };

  const handleOnClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Fade appear in={true}>
        <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
          <BreadcrumbComp active={"Add Book"} />
          <Row className="justify-content-evenly">
            <Col lg="10" md="10" xs="auto" sm="auto">
              <h3 className="mb-4">Add New Book </h3>
            </Col>
          </Row>
          <Row className="justify-content-evenly">
            <Col lg="5" md="5" xs="auto" sm="auto">
              {/* <h3 className="mb-4">Add New Book </h3> */}
              <Form noValidate validated={validated} onSubmit={handleFormData}>
                <FloatingLabel
                  style={{ paddingLeft: "0" }}
                  controlId="title"
                  label="Title"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    isInvalid={validated && !formData.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    please enter a title.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <FloatingLabel
                  controlId="author"
                  label="Author"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="text"
                    placeholder="Author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    isInvalid={validated && !formData.author}
                  />
                  <Form.Control.Feedback type="invalid">
                    please enter author name.
                  </Form.Control.Feedback>
                </FloatingLabel>
                <Row className="g-2">
                  <Col md sm xs>
                    <FloatingLabel
                      controlId="ISBN"
                      label="ISBN"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="text"
                        placeholder="ISBN"
                        name="ISBN"
                        value={formData.ISBN}
                        onChange={handleInputChange}
                        isInvalid={validated && !formData.ISBN}
                      />
                      <Form.Control.Feedback type="invalid">
                        please enter the ISBN.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md sm xs>
                    <FloatingLabel
                      controlId="genre"
                      label="Genre"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="text"
                        placeholder="Genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        isInvalid={validated && !formData.genre}
                      />
                      <Form.Control.Feedback type="invalid">
                        please select a genre.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>
                <Row className="g-2">
                  <Col md sm xs>
                    <FloatingLabel
                      controlId="published"
                      label="Published Year"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="number"
                        placeholder="Published"
                        name="published"
                        value={
                          formData.published === 0 ? "" : formData.published
                        }
                        onChange={handleInputChange}
                        isInvalid={validated && !formData.published}
                      />
                      <Form.Control.Feedback type="invalid">
                        please enter the published date.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>

                  <Col md sm xs>
                    <FloatingLabel
                      controlId="pages"
                      label="No of Pages"
                      className="mb-3"
                    >
                      <Form.Control
                        required
                        type="number"
                        placeholder="Pages"
                        name="pages"
                        value={formData.pages === 0 ? "" : formData.pages}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          console.log(e.target.value);
                          if (
                            (e.target.value.length <= 4 &&
                              !isNaN(parseInt(e.target.value))) ||
                            e.target.value === ""
                          ) {
                            console.log("Valid");
                            handleInputChange(e);
                          }
                        }}
                        isInvalid={validated && !formData.pages}
                      />
                      <Form.Control.Feedback type="invalid">
                        please enter no of pages.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="image"
                  label="Image Url"
                  className="mb-3"
                >
                  <Form.Control
                    required
                    type="Url"
                    placeholder="Image Url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    isInvalid={validated && !formData.image}
                  />
                  <Form.Control.Feedback type="invalid">
                    please enter a valid url.
                  </Form.Control.Feedback>
                </FloatingLabel>

                <FloatingLabel
                  controlId="description"
                  label="Description"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    name="description"
                    aria-label="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ height: "6.5rem" }}
                  />
                </FloatingLabel>
                <Row className="g-2">
                  <Col md={8} sm={8} xs={8} lg={8}>
                    <Button style={{ width: "100%" }} type="submit">
                      Submit
                    </Button>
                  </Col>

                  <Col md={4} sm={4} xs={4} lg={4}>
                    <Button
                      style={{ width: "100%" }}
                      type="button"
                      onClick={handlePromptGeneration}
                      disabled={loadingPrompt}
                    >
                      {loadingPrompt ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <Wand
                            style={{
                              width: "16px",
                              height: "16px",
                              fill: "white",
                              paddingLeft: "2px",
                              paddingRight: "2px",
                            }}
                          />
                          {" Generating"}
                        </>
                      ) : (
                        <>
                          <Wand
                            style={{
                              width: "16px",
                              height: "16px",
                              fill: "white",
                              paddingRight: "2px",
                            }}
                          />
                          {" Generate"}
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>

            <Col lg="4" md="4" xs="auto" sm="auto">
              <Row
                id="image"
                style={{
                  width: "100%", // Set a fixed width if needed, e.g., width: "400px"
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col lg="auto" md="auto" xs="auto" sm="auto">
                  <Image
                    style={{
                      width: "200px",
                      aspectRatio: "2/3",
                      objectFit: "cover",
                      borderRadius: "0.375rem",
                    }}
                    src={srcImg}
                    onError={() => {
                      setSrcImg(imagePlaceHolder);
                    }}
                  />
                </Col>
              </Row>
              <Row
                className="mt-4"
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Col lg="auto" md="auto" xs="auto" sm="auto">
                  <div>
                    <b>{`Title: ${formData.title}`}</b>
                  </div>
                  <div>{`Author: ${formData.author}`}</div>
                  <div>{`ISBN: ${formData.ISBN}`}</div>
                  <div>{`Genre: ${formData.genre}`}</div>
                  <div>{`Published: ${formData.published}`}</div>
                  <div>{`Pages: ${formData.pages}`}</div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Fade>
      <ConfirmationModal
        isOpen={showModal}
        title="Add Book Details"
        message="Confirm to Submit the Book Details"
        onConfirm={handleOnConfirm}
        onClose={handleOnClose}
      />
      <ToastItem
        showToast={showToast}
        {...toastObject}
        toggleToast={toggleShowtoast}
      />
    </>
  );
};

export default AddBook;
