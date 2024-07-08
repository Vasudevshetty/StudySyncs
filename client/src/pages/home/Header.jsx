import React from "react";

const Header = React.forwardRef(function Header({ toggleModal, navRef }, ref) {
  return (
    <header className="header" ref={ref}>
      <Navbar toggleModal={toggleModal} navRef={navRef} />
      <Title />
    </header>
  );
});

function Navbar({ toggleModal, navRef }) {
  return (
    <nav className="nav" ref={navRef}>
      <a  id="logo">
        <img src="img/logo-final-light.png" alt="" className="nav__logo" />
      </a>
      <ul className="nav__links">
        {["Features", "Operations", "Testimonials"].map((item, index) => (
          <li className="nav__item" key={item}>
            <a href={`#section--${index + 1}`} className="nav__link">
              {item}
            </a>
          </li>
        ))}
        <li className="nav__item">
          <a
            href="#"
            className="explore__link nav__link--btn btn--show-modal"
            onClick={toggleModal}
          >
            Explore more
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Title() {
  return (
    <div className="header__title">
      <div className="header__text">
        <h1 id="studysyncs-text">Unlock Academics resources seamlessly</h1>
        <h4 id="header__text">Get all study materials.</h4>
        <button
          className="btn--text btn--scroll-to header__text btn-learn--more"
          id="learn-more-btn"
        >
          Learn more &darr;
        </button>
      </div>
    </div>
  );
}

export default Header;
