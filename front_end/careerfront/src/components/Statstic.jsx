const Statstic = ({ head, data }) => {
  const data_to_map = data.slice(1).map((item) => {
    return (
      <li
        key={item.name}
        className="flex justify-between items-center mb-3 last:mb-[0] text-second text-lg"
      >
        <h1 className="">{item.name ? item.name : "N/A"}</h1>
        <p className="text-prime">{item.number ? item.number : "N/A"}</p>
      </li>
    );
  });

  return (
    <ul className="bg-light px-4 py-6 rounded-sm">
      <li className="flex  justify-between items-center mb-4  text-second  text-lg">
        <h1 className="font-bold">{head}</h1>
        <p className="relative  font-semibold">
          <span className=" absolute text-[12px] font-light -top-4 left-[6px]">
            ToTal
          </span>
          {data[0] ? data[0] : "N/A"}
        </p>
      </li>
      {data_to_map}
    </ul>
  );
};

export default Statstic;
