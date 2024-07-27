import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import Footer from "./Footer";
import Features from "./Features";
import Operations from "./Operations";
import Testimonials from "./Testimonials";
import Signup from "./Signup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  function toggleModal() {
    if (isAuth) navigate("/app/me");
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const nav = navRef.current;
    const header = headerRef.current;

    if (!nav || !header) return;

    const menuFadeHandler = (e) => {
      if (e.target.classList.contains("nav__link")) {
        const link = e.target;
        const siblings = link.closest(".nav").querySelectorAll(".nav__link");

        siblings.forEach((ele) => {
          if (ele !== link)
            ele.style.opacity = e.type === "mouseover" ? 0.5 : 1;
        });
      }
    };

    nav.addEventListener("mouseover", menuFadeHandler);
    nav.addEventListener("mouseout", menuFadeHandler);

    const navHeight = nav.getBoundingClientRect().height;
    const stickyNav = ([entry]) => {
      if (!entry.isIntersecting) nav.classList.add("sticky");
      else nav.classList.remove("sticky");
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });

    if (header instanceof Element) {
      headerObserver.observe(header);
    }

    const allSections = document.querySelectorAll(".section");
    const revealSection = ([entry], observer) => {
      if (!entry.isIntersecting) return;

      if (entry.target instanceof Element) {
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
      }
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach((section) => {
      if (section instanceof Element) {
        sectionObserver.observe(section);
        section.classList.add("section--hidden");
      }
    });

    const smoothScroll = (e) => {
      e.preventDefault();
      if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        const target = document.querySelector(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const scrollToSection1 = (e) => {
      e.preventDefault();
      const target = document.querySelector("#section--1");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navLinks = document.querySelector(".nav__links");
    const learnMoreBtn = document.getElementById("learn-more-btn");
    const logo = document.getElementById("logo");
    const studysyncsText = document.getElementById("studysyncs-text");
    const footerLogo = document.getElementById("footer-logo");
    const footerStudysyncsText = document.getElementById(
      "footer-studysyncs-text"
    );

    if (navLinks) navLinks.addEventListener("click", smoothScroll);
    if (learnMoreBtn) learnMoreBtn.addEventListener("click", scrollToSection1);
    if (logo) logo.addEventListener("click", scrollToTop);
    if (studysyncsText) studysyncsText.addEventListener("click", scrollToTop);
    if (footerLogo) footerLogo.addEventListener("click", scrollToTop);
    if (footerStudysyncsText)
      footerStudysyncsText.addEventListener("click", scrollToTop);

    return () => {
      if (nav) {
        nav.removeEventListener("mouseover", menuFadeHandler);
        nav.removeEventListener("mouseout", menuFadeHandler);
      }
      if (header instanceof Element) {
        headerObserver.unobserve(header);
      }
      allSections.forEach((section) => {
        if (section instanceof Element) {
          sectionObserver.unobserve(section);
        }
      });

      if (navLinks) navLinks.removeEventListener("click", smoothScroll);
      if (learnMoreBtn)
        learnMoreBtn.removeEventListener("click", scrollToSection1);
      if (logo) logo.removeEventListener("click", scrollToTop);
      if (studysyncsText)
        studysyncsText.removeEventListener("click", scrollToTop);
      if (footerLogo) footerLogo.removeEventListener("click", scrollToTop);
      if (footerStudysyncsText)
        footerStudysyncsText.removeEventListener("click", scrollToTop);
    };
  }, []);

  return (
    <>
      <Header ref={headerRef} toggleModal={toggleModal} navRef={navRef} />
      <Features />
      <Operations />
      <Testimonials />
      <Signup toggleModal={toggleModal} />
      <Footer />
      <Modal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      {isModalOpen && <div className="overlay"></div>}
    </>
  );
}

export default HomePage;
