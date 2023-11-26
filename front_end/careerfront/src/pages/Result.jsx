import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Result = () => {
  const { uuid } = useParams();
  const [result, setResult] = useState({});
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL}result/${uuid}`;

    axios.get(url).then((response) => setResult(response.data));
  }, []);
  console.log(result);
  return (
    <div className="layOutStyle">
      <section>
        <h2>Important! Save the following ID to see the results later</h2>
        <p>{uuid}</p>
        <div></div>
      </section>
    </div>
  );
};

export default Result;
