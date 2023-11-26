import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import axios from "axios";

const Quiz = () => {
  const [progress, setProgress] = useState("0%");

  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    setProgress(JSON.parse(sessionStorage.getItem("progress")) || "0%");
    let question_url = `${import.meta.env.VITE_URL}questions`;
    if (sessionStorage.getItem("questions")) {
      setQuestions(JSON.parse(sessionStorage.getItem("questions")));
    } else {
      axios.get(question_url).then((res) => {
        let array = res.data;
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        sessionStorage.setItem("questions", JSON.stringify(array));
        setQuestions(array);
      });
    }
  }, []);

  return (
    <main className="layOutStyle bg-prime px-10 py-10 max-md:px-3">
      <div className="w-full h-[50px] bg-white mb-5 rounded-sm relative">
        <div
          style={{
            width: progress,
            transition: "width 0.5s ease-in-out",
          }}
          className={`h-[50px] bg-second rounded-s-sm text-black ${
            parseFloat(progress.slice(0, -1)) >= 50
              ? "text-white"
              : "text-black"
          } `}
        >
          <span className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {progress}
          </span>
        </div>
      </div>
      <form className="flex flex-col gap-6 relative">
        <Pagination
          data={questions}
          itemsPerPage={3}
          setProgress={setProgress}
        />
      </form>
    </main>
  );
};

export default Quiz;
