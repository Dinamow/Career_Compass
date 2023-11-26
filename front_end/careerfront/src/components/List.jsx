const List = ({ title, data = [], type }) => {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="font-bold text-lg text-second">{title}</h3>
      <ul
        className={`flex flex-wrap ${
          type === "vertical" && "flex-col"
        } gap-x-2 gap-y-[13px] [&>*:nth-child(odd)]:bg-light [&>*:nth-child(odd)]:text-second [&>*:nth-child(even)]:bg-second [&>*:nth-child(even)]:text-white`}
      >
        {data.map((element) => {
          return (
            <li
              className={`px-5 py-[5px] ${
                type === "vertical" ? " rounded-sm self-start" : "rounded-full"
              } `}
              key={element}
            >
              {element}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default List;
