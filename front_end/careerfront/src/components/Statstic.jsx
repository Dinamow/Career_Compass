const Statstic = ({ head, data }) => {
  return (
    <ul className="bg-light px-4 py-6 rounded-sm">
      <li className="flex  justify-between items-center  text-second  text-lg">
        <h1 className="font-bold">{head}</h1>
        <p className="relative  font-semibold">
          <span className=" absolute text-[12px] font-light -top-4 left-[2px]">
            ToTal
          </span>
          3.5K
        </p>
      </li>
    </ul>
  );
};

export default Statstic;
