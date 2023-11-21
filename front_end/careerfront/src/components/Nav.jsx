import compass from "../assets/compass.svg";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import SubNav from "./SubNav";

const Nav = () => {
  const [isopen, setIsOpen] = useState(false);

  return (
    <nav className="bg-prime max-sm:px-5  px-8 py-3 flex justify-between items-center text-white">
      <NavLink
        to="/"
        className="flex items-center gap-[6px] text-[18px] font-medium "
      >
        <img src={compass} alt="compass" width="33px" height="33px" />
        Career Compass
      </NavLink>
      <div className="flex gap-5 items-center max-sm:hidden">
        <NavLink
          to="/team"
          className=" border border-white p-1 hover:opacity-90"
        >
          Team Members
        </NavLink>
        <NavLink
          to="/info"
          className="bg-second py-2 px-4 rounded-sm hover:opacity-90"
        >
          Take the quiz
        </NavLink>
      </div>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="sm:hidden flex flex-col gap-1"
      >
        <div className="w-7 h-1 bg-second rounded-md"></div>
        <div className="w-7 h-1 bg-second rounded-md"></div>
        <div className="w-7 h-1 bg-second rounded-md"></div>
      </button>
      {isopen && <SubNav />}
    </nav>
  );
};

export default Nav;
