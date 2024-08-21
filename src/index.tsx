import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BookProvider } from "./components/Context/BookContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/common/NavBar";
import BookDetails from "./components/BookDetails/BookDetails";
import BookPage from "./components/BookPage/BookPage";
import AddBook from "./components/Admin/AddBook";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Create a client
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <BookProvider>
        <NavBar>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/books" element={<App />} />
            <Route path="/book/:bookId" element={<BookPage />} />
            <Route path="/addbook" element={<AddBook />} />
          </Routes>
        </NavBar>
      </BookProvider>
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
