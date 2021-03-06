import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import MyCarousel from "./MyCarousel";
import FeaturedUsers from "./MyFeaturedUsers";
import "./landing.css";

function Landing(data) {
  return (
    <React.Fragment>
      <div className="container-header">
        <Row>
          <Col span={8}></Col>
          <Col span={8} className="site-container">
            Gamers Assembly
          </Col>
          <Col span={8}></Col>
        </Row>
      </div>
      <div className="carousel-container">
        <MyCarousel></MyCarousel>
      </div>
      <FeaturedUsers data={data} />
    </React.Fragment>
  );
}

export default Landing;
