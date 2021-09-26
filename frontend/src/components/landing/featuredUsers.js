import React from "react";
import { Row, Col, Button, Tooltip } from "antd";
import "antd/dist/antd.css";
import styles from "./landing.css";
import UserCard from "../userdetails/userCard";

function featuredUsers() {
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

export default featuredUsers;
