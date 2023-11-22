import Member from "../components/Member";

const Team = () => {
  return (
    <main className="layOutStyle flex flex-col justify-center items-center gap-5 my-6">
      <h1 className="text-prime font-bold text-2xl">Team Members</h1>
      <section className="grid grid-cols-2 px-20 gap-5">
        <Member
          name="Ahmed Mohammed"
          title="Front-end developer"
          text="A passionate front-end developer with one year of experience in building websites and web applications."
          email="ahmedmoh0107@gmail.com"
          githubL="https://github.com/AhmedMohamed800"
          websiteL="https://github.com/AhmedMohamed800"
          alt="Ahmed's github"
        />
        <Member
          name="Abdou Dinamow"
          title="Back-end developer"
          text="A passionate back-end developer with 0 years of experience in building websites and web applications."
          email="ahmedmoh0107@gmail.com"
          githubL="https://github.com/Dinamow"
          websiteL="https://github.com/Dinamow"
          alt="Dianmow"
        />
      </section>
    </main>
  );
};

export default Team;
