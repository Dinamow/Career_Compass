import github from "../assets/github.svg";
import website from "../assets/website.svg";

const Member = ({ name, title, text, email, github, website, image, alt }) => {
  return (
    <div>
      <div></div>
      <div>
        <h4>{name}</h4>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
      <div>
        <div>
          <a href="">
            <img
              src={github}
              alt={`github ${alt}`}
              width="20px"
              height="20px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Member;
