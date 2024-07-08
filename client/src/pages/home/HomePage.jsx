import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Modal from "./Modal";
import Footer from "./Footer";
import Features from "./Features";
import Operations from "./Operations";
import Testimonials from "./Testimonials";
import Signup from "./Signup";

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  useEffect(() => {
    const nav = navRef.current;
    const header = headerRef.current;

    const menuFadeHandler = function (e) {
      if (e.target.classList.contains("nav__link")) {
        const link = e.target;

        const siblings = link.closest(".nav").querySelectorAll(".nav__link");

        siblings.forEach((ele) => {
          if (ele !== link) ele.style.opacity = this;
        });
      }
    };

    nav.addEventListener("mouseover", menuFadeHandler.bind(0.5));
    nav.addEventListener("mouseout", menuFadeHandler.bind(1));

    // Sticky navigation
    const navHeight = nav.getBoundingClientRect().height;
    const stickyNav = (entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting) nav.classList.add("sticky");
      else nav.classList.remove("sticky");
    };

    const headerObserver = new IntersectionObserver(stickyNav, {
      root: null,
      threshold: 0,
      rootMargin: `-${navHeight}px`,
    });

    headerObserver.observe(header);

    // Reveal sections on scroll
    const allSections = document.querySelectorAll(".section");
    const revealSection = function (entries, observer) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach((section) => {
      sectionObserver.observe(section);
      section.classList.add("section--hidden");
    });

    // Smooth scrolling for nav links
    document
      .querySelector(".nav__links")
      .addEventListener("click", function (e) {
        e.preventDefault();
        if (e.target.classList.contains("nav__link")) {
          const id = e.target.getAttribute("href");
          document.querySelector(id).scrollIntoView({ behavior: "smooth" });
        }
      });

    // Scroll to section 1 on button click
    document
      .getElementById("learn-more-btn")
      .addEventListener("click", function (e) {
        e.preventDefault();
        document
          .querySelector("#section--1")
          .scrollIntoView({ behavior: "smooth" });
      });

    // Scroll to top on logo click
    document.getElementById("logo").addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Scroll to top on "StudySyncs" text click
    document
      .getElementById("studysyncs-text")
      .addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    // Scroll to top on footer logo click
    document
      .getElementById("footer-logo")
      .addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    // Scroll to top on footer "StudySyncs" text click
    document
      .getElementById("footer-studysyncs-text")
      .addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

    return () => {
      nav.removeEventListener("mouseover", menuFadeHandler.bind(0.5));
      nav.removeEventListener("mouseout", menuFadeHandler.bind(1));
      headerObserver.disconnect();
      sectionObserver.disconnect();
      document
        .getElementById("learn-more-btn")
        .removeEventListener("click", function (e) {
          e.preventDefault();
          document
            .querySelector("#section--1")
            .scrollIntoView({ behavior: "smooth" });
        });
      document
        .getElementById("logo")
        .removeEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      document
        .getElementById("studysyncs-text")
        .removeEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      document
        .getElementById("footer-logo")
        .removeEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
      document
        .getElementById("footer-studysyncs-text")
        .removeEventListener("click", function (e) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        });
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
