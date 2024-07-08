import { useEffect, useRef } from "react";

function Features() {
  const imgRefs = useRef([]);

  useEffect(() => {
    const lazyLoad = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.src = entry.target.dataset.src;

        entry.target.addEventListener("load", () => {
          entry.target.classList.remove("lazy-img");
        });
        if (entry.target instanceof Element) observer.unobserve(entry.target);
      });
    };

    const imgObserver = new IntersectionObserver(lazyLoad, {
      root: null,
      threshold: 0,
      rootMargin: "100px",
    });

    imgRefs.current.forEach((img) => imgObserver.observe(img));

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      imgRefs.current.forEach((img) => {
        if (img instanceof Element) imgObserver.unobserve(img);
      });
    };
  }, []);

  return (
    <section className="section" id="section--1">
      <div className="section__title">
        <h2 className="section__description">Features</h2>
        <h3 className="section__header">
          All your academic needs are centralized and accessible
        </h3>
      </div>
      <div className="features">
        <img
          src="img/digital-lazy.jpg"
          data-src="img/digital.jpg"
          alt="Computer"
          className="features__img lazy-img"
          ref={(el) => imgRefs.current.push(el)}
        />
        <Feature
          icon="icon-monitor"
          header="100% digitalized resources"
          description="Study Syncs offers 100% digitalized resources, providing interactive, up-to-date materials accessible on multiple devices, enhancing flexibility, personalization, and preparation for a digitally-driven world."
        />
        <Feature
          icon="icon-trending-up"
          header="Extensive Resource Library"
          description="Study Syncs boasts an extensive resource library, offering a vast collection of meticulously organized notes, tutorials, and reference materials. This comprehensive repository ensures students have easy access to all necessary study materials, aiding in efficient and thorough learning directly from the website."
        />
        <img
          src="img/grow-lazy.jpg"
          data-src="img/grow.jpg"
          alt="Plant"
          className="features__img lazy-img"
          ref={(el) => imgRefs.current.push(el)}
        />
        <img
          src="img/card-lazy.jpg"
          data-src="img/card.jpg"
          alt="Credit card"
          className="features__img lazy-img"
          ref={(el) => imgRefs.current.push(el)}
        />
        <Feature
          icon="icon-credit-card"
          header="Interactive Assessments"
          description="Engage in dynamic quizzes and tests with instant feedback, reinforcing learning and tracking progress effectively. These assessments adapt to your skill level, ensuring a personalized and effective study experience."
        />
      </div>
    </section>
  );
}

export default Features;

function Feature({ icon, header, description }) {
  return (
    <div className="features__feature">
      <div className="features__icon">
        <svg>
          <use xlinkHref={`img/icons.svg#${icon}`}></use>
        </svg>
      </div>
      <h5 className="features__header">{header}</h5>
      <p>{description}</p>
    </div>
  );
}
