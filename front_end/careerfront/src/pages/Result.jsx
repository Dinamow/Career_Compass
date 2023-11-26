import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import facebook from "../assets/facebook.svg";
import twitter from "../assets/twitter.svg";
import share from "../assets/share.svg";
import List from "../components/List";

const Result = () => {
  const [copied, setCopied] = useState(false);

  const intelligence_beauty = {
    logical_mathematical: "Logical-Mathematical 📚",
    linguistic: "Linguistic 📝",
    spatial_visual: "Visual-Spatial 🗺️",
    bodily_kinesthetic: "Bodily-Kinesthetic 🏃",
    musical: "Musical 🎵",
    interpersonal: "Interpersonal 🤝",
    intrapersonal: "Intrapersonal 🧘",
    naturalist: "Naturalist 🌿",
  };
  const { uuid } = useParams();
  const [result, setResult] = useState(undefined);
  useEffect(() => {
    const url = `${import.meta.env.VITE_URL}result/${uuid}`;

    axios.get(url).then((response) => setResult(response.data));
  }, []);

  async function copyText() {
    try {
      await navigator.clipboard.writeText(
        `${import.meta.env.VITE_CURRENT_URL}/result/${uuid}`
      );
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  return (
    <div className="layOutStyle px-8 max-sm:px-5 flex flex-col gap-8 mb-8">
      <section className="text-center mt-8 flex flex-col gap-5">
        <h2 className="text-second font-medium text-lg">
          Important! Save the following ID to see the results later
        </h2>
        <p className="text-second border border-prime py-2 px-2">
          {copied ? "Link copied" : uuid}
        </p>
        <div className="flex gap-4 items-center justify-center flex-row-reverse relative">
          <button onClick={copyText}>
            <img src={share} alt="share" width="25px" height="25px" />
          </button>
          {/* <button>
            <img src={facebook} alt="facebook" width="33px" height="33px" />
          </button>
          <button>
            <img src={twitter} alt="twitter" width="29px" height="29px" />
          </button> */}
        </div>
      </section>
      <main className="flex flex-col gap-[3px]">
        <h2 className="text-prime font-medium text-lg">
          Hello, {result && result.name}
        </h2>
        <h3 className="text-lg font-bold text-second mb-5">
          Your Top Two Types of Intelligence
        </h3>
        <section className="flex flex-col gap-5">
          {result &&
            result.types.map((data, index) => {
              return (
                <div
                  key={data.type}
                  className="first:bg-light first:text-second last:bg-second last:text-white px-5 py-5 rounded-sm   "
                >
                  <h4 className="mb-2 font-medium pl-10">
                    #{index + 1} {intelligence_beauty[data.type]}
                  </h4>
                  <p className="text-justify">{data.description}</p>
                </div>
              );
            })}
        </section>
      </main>
      <List
        title="Ideal Roles for You"
        data={result && result.types[0].roles.concat(result.types[1].roles)}
        type="horizontal"
      />
      <List
        title="Ideal Faculties for You"
        data={
          result && result.types[0].faculties.concat(result.types[1].faculties)
        }
        type="horizontal"
      />

      <List
        title="Ideal Activates for You"
        data={
          result && result.types[0].activites.concat(result.types[1].activites)
        }
        type="vertical"
      />
    </div>
  );
};

export default Result;
