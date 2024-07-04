"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});

btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed content
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;

  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((tabs) =>
    tabs.classList.remove("operations__content--active")
  );

  const tabNo = clicked.getAttribute("data-tab");

  const tabContent = document.querySelector(`.operations__content--${tabNo}`);
  tabContent.classList.add("operations__content--active");
});

const menuFadeHandler = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((ele) => {
      if (ele !== link) ele.style.opacity = this;
    });

    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", menuFadeHandler.bind(0.5));
nav.addEventListener("mouseout", menuFadeHandler.bind(1));

// sticky
const header = document.querySelector(".header");
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

const allSections = document.querySelectorAll(".section");
// revelaing elements on scroll.
const revealSection = function (entries, observer, e) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(e.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// lazy loading images.
const imgTargets = document.querySelectorAll("img[data-src]");

const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// slidersss.
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currSlide = 0,
  maxSlides = slides.length;

const createDot = function () {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};

// support functions
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = function (slideNo) {
  slides.forEach(
    (slide, index) =>
      (slide.style.transform = `translateX(${100 * (index - slideNo)}%)`)
  );
  activateDot(slideNo);
};

const nextSlide = function () {
  if (currSlide === maxSlides - 1) currSlide = 0;
  else currSlide++;

  goToSlide(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) currSlide = maxSlides - 1;
  else currSlide--;

  goToSlide(currSlide);
};

// event handlers
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (e) {
  e.key === "ArrowRight" && nextSlide();
  e.key === "ArrowLeft" && prevSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    goToSlide(e.target.dataset.slide);
    activateDot(e.target.dataset.slide);
  }
});

const init = function () {
  createDot();
  goToSlide(0);
};
init();

document
  .querySelector(".modal__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("home-page").style.display = "none";
    document.getElementById("root").style.display = "block";
    closeModal();
    history.pushState(null, "", "/app");
    removeHomePageStylesAndScripts();
  });

function removeHomePageStylesAndScripts() {
  // Remove home page CSS
  const homeCss = document.querySelector('link[href="/home.css"]');
  if (homeCss) {
    homeCss.parentNode.removeChild(homeCss);
  }

  // Remove home page JS
  const homeJs = document.querySelector('script[src="/home.js"]');
  if (homeJs) {
    homeJs.parentNode.removeChild(homeJs);
  }
}

// Listen for popstate event (back/forward navigation)
window.addEventListener("popstate", function (e) {
  e.preventDefault();
  // Check if we are on the home page (/)
  if (location.pathname === "/") {
    // Create a new link element
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = "/home.css";
    link.as = "style";

    // Define onload handler to change rel attribute once loaded
    link.onload = function () {
      this.onload = null; // Prevent memory leaks
      this.rel = "stylesheet";
    };

    // Append the link element to the document head
    document.head.appendChild(link);
    // Restore home page JavaScript
    const homeJs = document.createElement("script");
    homeJs.src = "/home.js";
    document.body.appendChild(homeJs);

    document.getElementById("home-page").style.display = "block";
    document.getElementById("root").style.display = "none";
    // Reload or rerender your vanilla home page here as needed
    location.reload(); // This reloads the page, you can customize this logic
  }
});
