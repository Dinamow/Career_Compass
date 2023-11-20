import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const QuizLayOut = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default QuizLayOut;
