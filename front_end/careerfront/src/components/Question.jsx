import { useEffect, useRef, useState } from "react";
import { useStore } from "../store/store";

const Question = ({
  Intelligence_type,
  title,
  question_number,
  question_precent,
  setProgress,
}) => {
  const setPoints = useStore((store) => store.setIntelligence);

  const [firstTime, setFirstTime] = useState(true);
  const inputContainer = useRef(null);
  const get_data = JSON.parse(sessionStorage.getItem(question_number));
  const uuid1 = get_data
    ? get_data.uuid1
    : Math.random().toString(36).substring(2, 15);
  const uuid2 = get_data
    ? get_data.uuid2
    : Math.random().toString(36).substring(2, 15);
  const uuid3 = get_data
    ? get_data.uuid3
    : Math.random().toString(36).substring(2, 15);
  const uuid4 = get_data
    ? get_data.uuid4
    : Math.random().toString(36).substring(2, 15);

  useEffect(() => {
    const childrenArray = Array.from(inputContainer.current.children);
    setFirstTime(get_data ? get_data.firstTime : true);
    childrenArray.forEach((element) => {
      const child = element;
      if (get_data) {
        if (get_data.chosen === element.getAttribute("data-id")) {
          child.classList.add("label_question_checked");
          child.classList.remove("label_question_unchecked");
        }
      }
    });
  }, []);

  function checkClikecd(e) {
    if (e.target.tagName === "INPUT") {
      if (firstTime) {
        setProgress((prev) => {
          const number = `${parseFloat(prev.slice(0, -1)) + question_precent}%`;
          sessionStorage.setItem("progress", JSON.stringify(number));
          return number;
        });
        setFirstTime(false);
      }

      const childrenArray = Array.from(inputContainer.current.children);
      const id = e.target.id;
      childrenArray.forEach((element) => {
        const child = element;
        if (id === element.getAttribute("data-id")) {
          setPoints(
            element.getAttribute("data-type"),
            element.getAttribute("data-value"),
            get_data ? get_data.preValue : 0
          );
          sessionStorage.setItem(
            question_number,
            JSON.stringify({
              uuid1: uuid1,
              uuid2: uuid2,
              uuid3: uuid3,
              uuid4: uuid4,
              chosen: id,
              preValue: element.getAttribute("data-value"),
              firstTime: false,
            })
          );
          child.classList.add("label_question_checked");
          child.classList.remove("label_question_unchecked");
        } else {
          child.classList.remove("label_question_checked");
          child.classList.add("label_question_unchecked");
        }
      });
    }
  }

  return (
    <div className="flex flex-col gap-3 ">
      <p className="text-white font-medium">
        {question_number}. {title}.
      </p>
      <div
        className="flex  flex-col-reverse items-start gap-5"
        ref={inputContainer}
        onClick={checkClikecd}
      >
        <label
          htmlFor={uuid1}
          data-id={uuid1}
          data-value="1"
          data-type={Intelligence_type}
          className="label_question_unchecked label_question"
        >
          Mostly Disagree
          <input
            className="input_question"
            type="radio"
            id={uuid1}
            name={uuid1}
            value="1"
            required
          />
        </label>
        <label
          htmlFor={uuid2}
          data-id={uuid2}
          data-type={Intelligence_type}
          data-value="2"
          className="label_question_unchecked label_question"
        >
          Slightly Disagree
          <input
            type="radio"
            id={uuid2}
            name={uuid1}
            className="input_question "
            value="2"
            required
          />
        </label>
        <label
          htmlFor={uuid3}
          data-id={uuid3}
          data-value="3"
          data-type={Intelligence_type}
          className="label_question_unchecked label_question"
        >
          Slightly Agree
          <input
            type="radio"
            id={uuid3}
            name={uuid1}
            className="input_question "
            value="3"
            required
          />
        </label>
        <label
          htmlFor={uuid4}
          data-id={uuid4}
          data-value="4"
          data-type={Intelligence_type}
          className="label_question_unchecked label_question"
        >
          Mostly Agree
          <input
            type="radio"
            id={uuid4}
            name={uuid1}
            className="input_question"
            value="4"
            required
          />
        </label>
      </div>
    </div>
  );
};

export default Question;
