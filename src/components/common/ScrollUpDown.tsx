import { useEffect, useState } from "react";
import "./ScrollUpDown.css";

export const ScrollUpDown = ({ scrollDown }: { scrollDown: boolean }) => {
  const [scrollActive, setScrollActive] = useState<boolean>(
    scrollDown ? true : false
  );

  const scrollTo = () => {
    if (scrollDown) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (scrollDown) {
        if (window.scrollY < 120) {
          setScrollActive(true);
        } else {
          setScrollActive(false);
        }
      } else {
        if (
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 100
        ) {
          setScrollActive(true);
        } else {
          setScrollActive(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <a
        className={`go-to-down d-flex justify-content-center align-items-center ${
          scrollActive ? "active" : ""
        } `}
        onClick={scrollTo}
      >
        <i
          className={`bi ${
            scrollDown ? "bi-arrow-down-short" : "bi-arrow-up-short"
          }`}
        ></i>
      </a>
    </>
  );
};
