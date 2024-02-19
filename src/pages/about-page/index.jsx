import Features from "./features";

const AboutPage = () => {
  return (
    <section className="fs-3 p-3 sidebar-offset">
      <Features />
      <p>
        Developed by{" "}
        <a href="https://github.com/MohamedNageh832" target="_blank">
          Mohamed nageh
        </a>
        , "Inspired by google calendar"
      </p>

      <small>&copy;2022 all rights reserved</small>
    </section>
  );
};

export default AboutPage;
