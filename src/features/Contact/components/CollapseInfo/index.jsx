import React, { useState } from "react";
import { Card, CardBody, Collapse } from "reactstrap";
import "./CollapseInfo.scss";

const items = [
  {
    label: "Accordion Title One",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.",
  },
  {
    label: "Second Title Here",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.",
  },
  {
    label: "Accordion Title Three",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.",
  },
  {
    label: "Fourth Accordion Title",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisic elit. Sed voluptate nihil eumester consectetur similiqu consectetur.",
  },
];

function CollapseInfo(props) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    if (activeIndex === index) setActiveIndex(-1);
    else setActiveIndex(index);
  };

  return (
    <div className="collapse-info">
      {items.map((item, index) => (
        <div
          key={index}
          className={`collapse-info__item ${
            index === activeIndex ? "active" : ""
          }`}
        >
          <p
            className="collapse-info__label"
            color="primary"
            onClick={() => toggle(index)}
          >
            {item.label}
          </p>
          <Collapse isOpen={activeIndex === index}>
            <Card>
              <CardBody className="collapse-info__content">
                {item.content}
              </CardBody>
            </Card>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default CollapseInfo;
