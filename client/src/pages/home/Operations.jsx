import { useState } from "react";
import Section from "./Section";

function Operations() {
  return (
    <Section
      sectionNo={2}
      description="Operations"
      header="Streamlined learning without sacrificing quality"
    >
      <TabbedContent />
    </Section>
  );
}

export default Operations;

function TabbedContent() {
  const [activeTab, setActiveTab] = useState(1);

  function handleTabClick(tabId) {
    setActiveTab(tabId);
  }

  return (
    <div className="operations">
      <div className="operations__tab-container">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`btn operations__tab operations__tab--${tab.id} ${
              activeTab === tab.id ? "operations__tab--active" : ""
            }`}
            data-tab={tab.id}
            onClick={() => handleTabClick(tab.id)}
          >
            <span>{tab.label.split(" ")[0]}</span>
            {tab.label.split(" ").slice(1).join(" ")}
          </button>
        ))}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`operations__content operations__content--${tab.id} ${
            activeTab === tab.id ? "operations__content--active" : ""
          }`}
        >
          <div className={`operations__icon operations__icon--${tab.id}`}>
            <svg>
              <use xlinkHref={`img/icons.svg#${tab.icon}`}></use>
            </svg>
          </div>
          <h5 className="operations__header">{tab.content}</h5>
          <p>{tab.description}</p>
        </div>
      ))}
    </div>
  );
}

const tabs = [
  {
    id: 1,
    label: "01 Instant Access",
    icon: "icon-upload",
    content: "Immediate access to all your study resources.",
    description:
      "Gain instant access to a comprehensive library of study materials. With StudySyncs, dive into organized notes and resources right when you need them. Enjoy seamless navigation and find exactly what you need to boost your learning efficiency and academic performance.",
  },
  {
    id: 2,
    label: "02 Effortless Learning",
    icon: "icon-home",
    content: "Streamlined access to your study essentials",
    description:
      "Experience effortless learning with StudySyncs. Our platform provides quick access to a vast array of well-organized notes and materials. Optimize your study sessions and improve your performance effortlessly with just a few clicks.",
  },
  {
    id: 3,
    label: "03 Seamless Integration",
    icon: "icon-user-x",
    content: "Integrate study resources into your routine seamlessly.",
    description:
      "Seamlessly integrate StudySyncs into your study routine. Access curated notes and reference materials without interruption. Our user-friendly interface ensures that you find and use your resources efficiently, enhancing your overall learning experience.",
  },
];
