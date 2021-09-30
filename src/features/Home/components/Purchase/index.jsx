import React from "react";
import { Button, Container } from "reactstrap";
import "./Purchase.scss";

Purchase.propTypes = {};

function Purchase(props) {
  return (
    <div className="purchase">
      <Container>
        <div className="purchase__inner">
          <div className="purchase__content">
            <div className="purchase__heading">
              <h3>
                Creative &amp; Unique <span>Sixteen</span> Product
              </h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque
                corporis amet elite author nulla.
              </p>
            </div>
            <Button className="button button--red">Purchase now</Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Purchase;
