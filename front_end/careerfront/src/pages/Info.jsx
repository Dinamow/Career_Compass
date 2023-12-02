import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

const Info = () => {
  const setForm = useStore((store) => store.setForm);
  const informaition = useStore((store) => store.information);

  const navigate = useNavigate();

  function Change(e) {
    setForm(e.target.name, e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    navigate("/quiz?page=1");
    sessionStorage.setItem("information", JSON.stringify(informaition));
  }

  return (
    <main className="layOutStyle flex justify-center bg-prime">
      <section className="bg-prime w-full py-5 px-[200px]  max-semiDesctop:px-[80px] max-md:px-[20px] justify-center      rounded-sm flex flex-col">
        <h1 className="text-white font-bold text-2xl mb-8">
          User Profile Information
        </h1>
        <form onSubmit={submit} className="flex flex-col">
          <label htmlFor="name" className="label">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={informaition.name}
              onChange={Change}
              required
              className="input mb-5"
            />
          </label>
          <label htmlFor="email" className="label">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={informaition.email}
              onChange={Change}
              required
              className="input mb-5"
            />
          </label>
          <label htmlFor="education" className="label pb-1">
            Education Level
          </label>
          <select
            name="quize_type"
            id="quize_type"
            value={informaition["quize_type"]}
            onChange={Change}
            required
            className="focus:border-0 focus:outline-none cursor-pointer py-[7px] px-1"
          >
            <option value="High school">High school student</option>
            <option value="graduate">Graduate</option>
          </select>
          <button
            type="submit"
            className="mt-10 text-white bg-second font-medium px-10 py-3 rounded-sm self-center hover:opacity-90"
          >
            Start the quiz
          </button>
        </form>
      </section>
    </main>
  );
};

export default Info;
