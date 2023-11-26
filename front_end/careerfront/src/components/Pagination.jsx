import React, { useState, useEffect, useRef } from "react";
import Question from "../components/question";
import axios from "axios";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const Pagination = ({ data, itemsPerPage, setProgress }) => {
  const information = useStore((store) => store.information);
  const navigate = useNavigate();

  let question_precent = 100 / data.length;
  let error_element = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMassage, setErrorMassage] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    const pageNumber = parseInt(pageParam) || 1;
    setCurrentPage(pageNumber);
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the URL with the new page number
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNumber);
    window.history.replaceState({}, "", url);
  };

  const nextPage = () => {
    let gotoNextPage = true;
    for (let i = 1; i <= itemsPerPage; i++) {
      let item = sessionStorage.getItem(i + itemsPerPage * (currentPage - 1));
      if (item == null) {
        gotoNextPage = false;
        setErrorMassage(`please answer question number ${
          i + itemsPerPage * (currentPage - 1)
        }
        `);
        if (error_element) {
          const middlePosition =
            error_element.current.offsetTop - window.innerHeight / 3;

          window.scrollTo({
            top: middlePosition,
            behavior: "smooth",
          });
        }

        break;
      }
    }
    if (gotoNextPage && currentPage < Math.ceil(data.length / itemsPerPage)) {
      paginate(currentPage + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  useEffect(() => {
    const clearErrorMessage = () => {
      setErrorMassage("");
    };

    const timeoutId = setTimeout(clearErrorMessage, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [errorMassage]);

  function sumbitForm() {
    for (let i = 1; i <= data.length; i++) {
      let item = sessionStorage.getItem(i);
      if (item == null) {
        setErrorMassage(`please answer question number ${i}`);
        return;
      }
    }
    let send_data_url = `${import.meta.env.VITE_URL}result`;
    console.log(information);
    axios.post(send_data_url, information).then((res) => {
      navigate(`/result/${res.data.uuid}`);
    });
  }

  return (
    <>
      {currentItems.map((data, index) => {
        return (
          <Question
            question_precent={question_precent}
            setProgress={setProgress}
            key={data["title"]}
            Intelligence_type={data["Intelligence_type"].toLowerCase()}
            title={data["title"]}
            question_number={index + 1 + itemsPerPage * (currentPage - 1)}
          />
        );
      })}

      {/* Pagination controls */}
      <div className="flex gap-4 self-center">
        <button
          type="button"
          onClick={prevPage}
          className="text-prime rounded-sm px-6 py-2 font-medium bg-white"
        >
          Previous
        </button>
        <button
          type="button"
          className={`text-white rounded-sm px-10 py-2 font-medium bg-second
          ${!(currentPage < Math.ceil(data.length / itemsPerPage)) && "hidden"}
          `}
          onClick={nextPage}
        >
          Next
        </button>
        <button
          type="button"
          className={`text-white rounded-sm px-10 py-2 font-medium bg-second
          ${currentPage < Math.ceil(data.length / itemsPerPage) && "hidden"}
          `}
          onClick={sumbitForm}
        >
          submit
        </button>
      </div>
      <p
        ref={error_element}
        className={`absolute w-[400px] max-sm:w-[300px] text-center text-light rounded-sm font-bold bg-second ${
          errorMassage != "" && "max-sm:px-3 max-sm:py-3 p-5 "
        } top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        {errorMassage}
      </p>
    </>
  );
};
export default Pagination;
