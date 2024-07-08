function Footer() {
  return (
    <footer className="footer">
      <ul className="footer__nav">
        {[
          "About",
          "Pricing",
          "Terms of use",
          "Privacy Policy",
          "Careers",
          "Blog",
          "Contact us",
        ].map((item) => (
          <li className="footer__item" key={item}>
            <a href="#" className="footer__link">
              {item}
            </a>
          </li>
        ))}
      </ul>
      <a href="#" id="footer-logo">
        <img src="./img/syncs-final.png" alt="Logo" className="footer__logo" />
      </a>
      <p id="footer-studysyncs-text" className="syncs_text">
        StudySyncs
      </p>
      <p className="footer_copyright">&copy; Copyright</p>
    </footer>
  );
}

export default Footer;
