import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./landing.css";
import UserCard from "../userdetails/userCard";

function FeaturedUsers() {
  const [APIData, setAPIData] = useState([]);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    const url = "http://localhost:5000/api/users/all/5";
    try {
      const res = await fetch(url);
      const data = await res.json();

      setAPIData(data);
    } catch (err) {
      setError(err.message);
    }

    console.log("error:", error);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(APIData);

  let profilePicture = APIData.map((e, i) => {
    return (
      <Col className="featured-col" span={4}>
        <button>
          <Tooltip placement="bottom" title={<UserCard />}>
            <img
              className="featured-img"
              src={APIData[i].profilePic}
              alt=""
              type="button"
              onClick=""
            />
          </Tooltip>
        </button>
      </Col>
    );
  });

  return (
    <React.Fragment>
      <div className="featured-container">
        <Row gutter={16}>{profilePicture}</Row>
      </div>
    </React.Fragment>
  );
}

export default FeaturedUsers;
