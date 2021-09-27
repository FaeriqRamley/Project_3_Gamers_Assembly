import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import Carousel from "./carousel";
import FeaturedUsers from "./FeaturedUsers";
import "./landing.css";

function Landing(data) {
  return (
    <React.Fragment>
      <div className="container-header">
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
      <FeaturedUsers data={data} />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Landing);
