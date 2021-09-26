import React, { useState, useEffect } from "react";
import { Col, Row, Layout, Avatar, Button } from "antd";
import "antd/dist/antd.css";
import { AntDesignOutlined, DownloadOutlined } from "@ant-design/icons";
import styles from "./userDetailsLayout.css";

function UserDetails() {
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    const url = "http://localhost:5000/api/users/all/5";

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(error);
  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6} className="avatar">
              <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={<AntDesignOutlined />}
              />
            </Col>
            <Col span={18}>
              <Row className="header-row">
                <Button
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                >
                  Edit Profile
                </Button>
                <div className="header-text">Username</div>
              </Row>
              <Row className="details-row">
                <div className="details-text">UserDetails</div>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UserDetails;
