import facebook from "../assets/faceF.svg";
import linkedIn from "../assets/linkF.svg";

const Footer = () => {
  return (
    <footer className="py-3 flex justify-between bg-second items-center px-8 max-md:flex-col max-md:gap-2 max-md:pt-5">
      <p className="text-white text-center">
        © All rights are reserved by Career Compass
      </p>
      <div className="flex gap-3  justify-center items-center">
        <a
          href="https://web.facebook.com/"
          target="_blank"
          className="hover:opacity-80"
        >
          <img src={facebook} alt="facebook" width="38px" height="38px" />
        </a>
        <a
          href="https://www.linkedin.com/"
          target="_blank"
          className="hover:opacity-80"
        >
          <img src={linkedIn} alt="facebook" width="38px" height="38px" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
