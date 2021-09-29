import React, { useState, useEffect } from "react";
import { Row, Col, Tooltip } from "antd";
import "antd/dist/antd.css";
import "./landing.css";
import UserCard from "../userdetails/UserCardSm";

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

  let profilePicture = APIData.map((item, i) => {
    return (
      <Col className="featured-col" span={4}>
        <button>
          <Tooltip placement="bottom" title={<UserCard data={item} />}>
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

  function randomUserShuffle(profilePicture) {
    var currentIndex = profilePicture.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = profilePicture[currentIndex];
      profilePicture[currentIndex] = profilePicture[randomIndex];
      profilePicture[randomIndex] = temporaryValue;
    }
    return profilePicture;
  }

  const limitFeatured = randomUserShuffle(profilePicture);
  const newLimit = limitFeatured.slice(0, 6);

  return (
    <React.Fragment>
      <div className="featured-container">
        <Row
          gutter={[24, 16]}
          style={{ marginLeft: "0px", marginRight: "0px" }}
        >
          {newLimit}
        </Row>
      </div>
    </React.Fragment>
  );
}

export default FeaturedUsers;
