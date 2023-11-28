import ReactDOM from "react-dom";
import { NavLink } from "react-router-dom";

const SubNav = () => {
  return ReactDOM.createPortal(
    <div className="flex text-white bg-prime w-full flex-col gap-2 py-3 sm:hidden items-center absolute top-[50px] left-0">
      <NavLink to="/team" className="w-full text-center py-2 hover:opacity-90">
        Team Members
      </NavLink>
      <NavLink to="/info" className="w-full text-center py-2  hover:opacity-90">
        Take the quiz
      </NavLink>
    </div>,
    document.querySelector("body")
  );
};

export default SubNav;
