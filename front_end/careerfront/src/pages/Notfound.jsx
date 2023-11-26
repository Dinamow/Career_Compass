import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <main className="layOutStyle flex flex-col gap-5 justify-center items-center">
      <h1 className="text-2xl text-second">Page Not Found</h1>
      <Link
        to="/"
        className=" text-white bg-second px-5 py-2 rounded-sm hover:opacity-90"
      >
        Take Me To Home
      </Link>
    </main>
  );
};
export default Notfound;
