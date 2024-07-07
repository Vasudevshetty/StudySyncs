import { useEffect, useRef, useState } from "react";
import Section from "./Section";

function Testimonials() {
  const [currSlide, setCurrSlide] = useState(0);
  const maxSlides = testimonials.length;
  const slideRefs = useRef([]);
  const dotContainerRef = useRef(null);

  useEffect(() => {
    createDots();
    goToSlide(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function createDots() {
    dotContainerRef.current.innerHTML = "";
    testimonials.forEach((_, index) => {
      const button = document.createElement("button");
      button.className = "dots__dot";
      button.setAttribute("data-slide", index);
      dotContainerRef.current.appendChild(button);
    });
  }

  function activateDot(slide) {
    const dots = dotContainerRef.current.querySelectorAll(".dots__dot");
    dots.forEach((dot) => dot.classList.remove("dots__dot--active"));
    dots[slide].classList.add("dots__dot--active");
  }

  function goToSlide(slide) {
    slideRefs.current.forEach((slideEl, index) => {
      slideEl.style.transform = `translateX(${100 * (index - slide)}%)`;
    });
    activateDot(slide);
  }

  function nextSlide() {
    const newSlide = currSlide === maxSlides - 1 ? 0 : currSlide + 1;
    setCurrSlide(newSlide);
    goToSlide(newSlide);
  }

  function prevSlide() {
    const newSlide = currSlide === 0 ? maxSlides - 1 : currSlide - 1;
    setCurrSlide(newSlide);
    goToSlide(newSlide);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currSlide]);

  function handleDotClick(e) {
    if (e.target.classList.contains("dots__dot")) {
      const slide = +e.target.getAttribute("data-slide");
      setCurrSlide(slide);
      goToSlide(slide);
    }
  }

  return (
    <Section
      sectionNo={3}
      description="Not sure yet?"
      header="Countless learners are already transforming their study habits with StudySyncs."
    >
      <div className="bg-video">
        <video
          className="bg-video__content"
          autoPlay={true}
          muted={true}
          loop={true}
        >
          <source src="./img/bg_video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="slider">
        {testimonials.map(({ header, text, author }, index) => (
          <div
            key={index}
            className="slide"
            ref={(el) => (slideRefs.current[index] = el)}
          >
            <Testimonial header={header} text={text} author={author} />
          </div>
        ))}
      </div>
      <button className="slider__btn slider__btn--left" onClick={prevSlide}>
        &larr;
      </button>
      <button className="slider__btn slider__btn--right" onClick={nextSlide}>
        &rarr;
      </button>
      <div
        className="dots"
        ref={dotContainerRef}
        onClick={handleDotClick}
      ></div>
    </Section>
  );
}

export default Testimonials;

function Testimonial({ header, text, author }) {
  return (
    <div className="testimonial">
      <h5 className="testimonial__header">{header}</h5>
      <blockquote className="testimonial__text">{text}</blockquote>
      <address className="testimonial__author">
        <img
          src={author.imgSrc}
          alt={author.name}
          className="testimonial__photo"
        />
        <h6 className="testimonial__name">{author.name}</h6>
        <p className="testimonial__location">{author.location}</p>
      </address>
    </div>
  );
}

const testimonials = [
  {
    header: "The smartest investment in my education and future!",
    text: "I first used StudySyncs Notes while doing a very heavy course load one semester. The notes I downloaded were organised and concise, and saved me time. I would highly recommend StudySyncs and will use it again.",
    author: {
      imgSrc: "img/user-1.jpg",
      name: "Aarav Lynn",
      location: "San Francisco, USA",
    },
  },
  {
    header: "The key to a streamlined study routine.",
    text: "StudySyncs Notes is an excellent resource for students who are struggling with a particular subject. The notes available are well-researched and comprehensive, providing students with all the information they need to succeed.",
    author: {
      imgSrc: "img/user-2.jpg",
      name: "Miyah Miles",
      location: "London, UK",
    },
  },
  {
    header: "Liberated from outdated study techniques.",
    text: "StudySyncs Notes has helped me immensely throughout my university studies. The notes available are incredibly detailed, and the formatting is clear and easy to follow. I highly recommend this website to anyone looking to improve their academic performance.",
    author: {
      imgSrc: "img/user-3.jpg",
      name: "Francisco Gomes",
      location: "Lisbon, Portugal",
    },
  },
];
