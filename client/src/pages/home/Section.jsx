function Section({ sectionNo, description, header, children }) {
  return (
    <section
      className={`section ${sectionNo == 2 ? "operations__bg" : ""}
      ${sectionNo === 3 ? "background__video" : ""}`}
      id={`section--${sectionNo}`}
    >
      <div
        className={`section__title ${sectionNo == 2 ? "operations__text" : ""}`}
      >
        <h2
          className={`section__description ${
            sectionNo === 2 ? "operations__text" : ""
          }`}
        >
          {description}
        </h2>
        <h3 className="section__header">{header}</h3>
      </div>
      {children}
    </section>
  );
}

export default Section;
