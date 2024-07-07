function Header() {
  return (
    <header className="header">
      <Navbar />
      <Title />
    </header>
  );
}

function Navbar() {
  return (
    <nav className="nav">
      <a href="/">
        <img
          src="img/logo-final-light.png"
          alt=""
          className="nav__logo"
          id="logo"
        />
      </a>
      <ul className="nav__links">
        {["Features", "Operations", "Testimonials"].map((item, index) => {
          return (
            <li className="nav__item" key={item}>
              <a href={`#section-${index + 1}`} className="nav__link">
                {item}
              </a>
            </li>
          );
        })}
        <li className="nav__item">
          <a href="#" className="nav__link nav__link--btn btn--show-modal">
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
        <h1>Unlock Academics resources seamlessly</h1>
        <h4 id="header__text">Get all study materials.</h4>
        <button className="btn--text btn--scroll-to header__text btn-learn--more">
          Learn more &darr;
        </button>
      </div>
    </div>
  );
}

export default Header;
