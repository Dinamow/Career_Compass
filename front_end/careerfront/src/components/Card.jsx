const Card = ({ head, text, color }) => {
  let cardColor;
  let textColor;
  if (color === "dark") {
    cardColor = "bg-second";
    textColor = "text-white";
  } else {
    cardColor = "bg-light";
    textColor = "text-second";
  }
  return (
    <div
      className={`${cardColor} last:justify-items-center w-[32.2%] max-semiDesctop:w-[48.9%] max-lg:w-[100%]  max-lg:py-5  rounded-sm  flex flex-col gap-2 ${textColor} px-5 py-3`}
    >
      <h1 className="text-center text-lg">{head}</h1>
      <p className=" text-justify">{text}</p>
    </div>
  );
};

export default Card;
