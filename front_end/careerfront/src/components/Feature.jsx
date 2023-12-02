const Feature = ({ title, text, img, position }) => {
  let pos = position === "r" ? "flex-row" : "flex-row-reverse";
  return (
    <section
      className={`flex items-center justify-between gap-3  mb-5 mt-[80px] max-lg:gap-6  max-lg:flex-col-reverse ${pos}`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-prime font-bold text-2xl   max-lg:text-center">
          {title}
        </h1>
        <p className="pLanding mt-3 mb-5">{text}</p>
      </div>
      <img
        src={img}
        alt="gardner quiz"
        width="398px"
        height="400px"
        className="mr-7 max-lg:mr-0"
      />
    </section>
  );
};

export default Feature;
