import React from "react";
import { PageHeader, Row, Col, Card, Tooltip, Button } from "antd";
import "antd/dist/antd.css";
import styles from "./landing.css";
import Carousel from "./carousel";
import UserCard from "../userdetails/userCard";

function Landing() {
  let content = (
    <Col className="featured-col" span={4}>
      <button>
        <Tooltip placement="bottom" title={<UserCard />}>
          <img
            className="featured-img"
            src="https://images.unsplash.com/photo-1566650554919-44ec6bbe2518?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwYW5pbWFsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
            alt=""
            type="button"
            onClick=""
          />
        </Tooltip>
      </button>
    </Col>
  );

  return (
    <React.Fragment>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Title"
        subTitle="This is a subtitle"
      />
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
      <div className="featured-container">
        <Row gutter={16}>
          {content}
          {content}
          {content}
          {content}
          {content}
          {content}
        </Row>
      </div>
    </React.Fragment>
  );
}

export default Landing;
