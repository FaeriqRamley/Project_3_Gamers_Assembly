import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import Carousel from "./carousel";
import FeaturedUsers from "./featuredUsers";
import styles from "./landing.css";

function Landing(props) {
  console.log(props.auth);
  return (
    <React.Fragment>
      <div className="container">
        <Row>
          <Col span={8}></Col>
          <Col span={8} className="site-container">
            GamersAssemble
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
      <div className="carousel-container">
        <Carousel></Carousel>
      </div>
      <FeaturedUsers />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Landing);
