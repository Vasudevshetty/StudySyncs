function Section({ sectionNo, description, header, children }) {
  return (
    <section className="section" id={`section--${sectionNo}`}>
      <div className="section__title">
        <h2 className="section__description">{description}</h2>
        <h3 className="section__header">{header}</h3>
      </div>
      {children}
    </section>
  );
}

export default Section;
