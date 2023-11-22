import { NavLink } from "react-router-dom";
import Card from "../components/Card";
import Statstic from "../components/Statstic";
import { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [completed, setCompleted] = useState([]);
  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    let url = `${import.meta.env.VITE_URL}statistics`;
    axios.get(url).then((res) => {
      const first = [
        res.data["Completed the quize"],
        { number: `${res.data["Graduates"]} people`, name: "Graduates" },
        {
          number: `${res.data["High school students"]} people`,
          name: "High school students",
        },
      ];
      const second = [
        "100%",
        {
          number: `${res.data["bodily_kinesthetic"].toFixed(2)}%`,
          name: "Bodily-Kinesthetic",
        },
        {
          number: `${res.data["interpersonal"].toFixed(2)}%`,
          name: "Interpersonal",
        },
        {
          number: `${res.data["intrapersonal"].toFixed(2)}%`,
          name: "Intrapersonal",
        },
        { number: `${res.data["linguistic"].toFixed(2)}%`, name: "Linguistic" },
        { number: `${res.data["musical"].toFixed(2)}%`, name: "Musical" },
        {
          number: `${res.data["naturalistic"].toFixed(2)}%`, // edit naturalistic to naturalist
          name: "Naturalist",
        },
        {
          number: `${res.data["spatial_visual"].toFixed(2)}%`,
          name: "Visual-Spatial",
        },
        {
          number: `${res.data["logical_mathematical"].toFixed(2)}%`,
          name: "Logical-Mathematical",
        },
      ];
      setCompleted(first);
      setStatistics(second);
    });
  }, []);
  return (
    <main className="layOutStyle  px-8 max-sm:px-5 flex flex-col gap-5">
      <header className="flex max-lg:flex-col-reverse justify-between  items-center mt-5">
        <section className="flex flex-col gap-1 max-lg:items-center ">
          <h1 className="text-prime font-bold text-2xl  mb-3 max-lg:text-center">
            Find Your Dream Job with Career Compass
          </h1>
          <p className="pLanding mt-3 mb-3">
            Not sure what you want to be when you grow up? No worries, Career
            Compass is here to help!
          </p>
          <p className="pLanding  mb-5">
            Take our super quick quiz and we’ll show you jobs that are perfect
            for you.
          </p>
          <NavLink
            to="/info"
            className="text-white px-4 py-[10px] rounded-sm  bg-prime self-start max-lg:self-center hover:opacity-90"
          >
            Take the free quiz now
          </NavLink>
          <p className="text-sm text-light">* No registration required</p>
        </section>
        <div className="bg-compass bg-cover w-[450px] h-[450px] max-sm:w-[300px] max-sm:h-[300px] max-tab:w-[400px] max-tab:h-[400px]"></div>
      </header>
      <section className="flex flex-col gap-3 mb-10 mt-5">
        <h1 className="header mb-5">What are the Intelligence Types? </h1>
        <div className="flex gap-5 flex-wrap ">
          <Card
            head="📚 Linguistic-Verbal  📚"
            text="Love reading, writing, and learning languages? Your linguistic-verbal intelligence might be your strength!"
          />
          <Card
            head="🗺️ Visual-Spatial 🗺️"
            text="Great at visualizing, understanding maps and diagrams? You might have strong visual-spatial intelligence!"
            color="dark"
          />
          <Card
            head="📚 Logical-Mathematical 📚 "
            text="Enjoy solving problems, logical reasoning, and learning about scientific investigations? You might have strong logical-mathematical intelligence"
          />
          <Card
            head="🤸 Bodily-Kinesthetic 🤸‍️"
            text="Excel in sports, dance, or other physical activities? You might have strong bodily-kinesthetic intelligence!"
            color="dark"
          />
          <Card
            head="🎵 Musical 🎵"
            text="Do melodies and rhythms resonate with you more than words? Do find yourself tapping out rhythms unconsciously?"
          />
          <Card
            head="👥 Interpersonal 👥"
            text="Good at understanding people, leading, organizing, communicating, mediating, and manipulating? You might have strong interpersonal intelligence!"
            color="dark"
          />
          <Card
            head="🌟 Intrapersonal 🌟"
            text="Have a deep awareness of your inner feelings, values, beliefs, and thinking processes? Your intrapersonal intelligence might be your strength!"
          />
          <Card
            head="🌳 Naturalist 🌳"
            text="Love exploring nature and learning about different species? You might have strong naturalist intelligence!"
            color="dark"
          />
        </div>
      </section>
      <section className="flex flex-col gap-3 mb-10">
        <h1 className="header mb-5">Statistics</h1>
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-5">
          <Statstic head="Intelligence Types" data={statistics} />
          <div className="grid grid-rows-2 gap-5">
            <Statstic head="Completed the Quiz" data={completed} />
            <div className="flex flex-col pb-3 bg-second text-center gap-3  justify-center rounded-sm items-center">
              <h3 className="text-light text-2xl font-bold">What about you?</h3>
              <NavLink
                to="/info"
                className="text-white px-4 py-[10px] rounded-sm  bg-prime  max-lg:self-center hover:opacity-90"
              >
                Take the free quiz now
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
