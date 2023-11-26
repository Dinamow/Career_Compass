import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const QuizLayOut = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(sessionStorage.getItem("information"))) {
      navigate("/info");
    }
  }, []);

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default QuizLayOut;
