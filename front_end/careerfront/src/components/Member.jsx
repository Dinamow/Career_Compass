import github from "../assets/github.svg";
// import website from "../assets/website.svg";
import website from "../assets/twitter.svg";

const Member = ({
  name,
  title,
  text,
  email,
  githubL,
  websiteL,
  image,
  alt,
}) => {
  return (
    <div className="bg-back border border-gray-300 rounded-sm">
      {/* <div className={`${image ? image : "bg-slate-300"} h-[250px]`}></div> */}
      <div className="px-5 pt-5 pb-2 flex flex-col gap-[4px]">
        <h4 className="text-second font-bold">{name}</h4>
        <h4 className="text-prime font-medium">{title}</h4>
        <p className="text-second text-justify">{text}</p>
      </div>
      <div className="flex justify-between items-center px-5 pb-3 pt-[7px]">
        <div className="flex gap-1">
          <a href={websiteL} target="_blank" className="hover:opacity-90">
            <img
              src={website}
              alt={`twitter ${alt}`}
              width="22px"
              height="22px"
            />
          </a>
          <a href={githubL} target="_blank" className="hover:opacity-90">
            <img
              src={github}
              alt={`github ${alt}`}
              width="22px"
              height="22px"
            />
          </a>
        </div>
        <a
          href={`mailto:${email}`}
          className="font-medium text-white bg-second px-8 py-2 rounded-sm hover:opacity-90"
        >
          Hire me
        </a>
      </div>
    </div>
  );
};

export default Member;
