import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import "./userCard.css";

function UserCard(props) {
  // const { Meta } = Card;
  return (
    <React.Fragment>
      <div>
        <Card
          style={{ width: 250, maxHeight: 360, background: "#182938" }}
          cover={<img alt="example" src={props.data.profilePic} />}
        >
          <div>
            <h1>{props.data.userName}</h1>
            <h2>
              {props.data.firstName} {props.data.lastName}
            </h2>
            <h3>{props.data.location}</h3>
            <p className="bio">Bio: {props.data.bio}</p>
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserCard;
