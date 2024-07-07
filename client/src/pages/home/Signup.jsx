function Signup({ toggleModal }) {
  return (
    <section className="section section--sign-up">
      <div className="section__title">
        <h3 className="section__header">
          Best time to start StudySyncs? Yesterday. Second best? Today
        </h3>
      </div>
      <button className="btn--show-modal btn-footer" onClick={toggleModal}>
        Log in to explore more!
      </button>
    </section>
  );
}

export default Signup;
