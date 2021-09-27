import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import "./userCard.css";

function UserCard(props) {
  console.log(props);
  const { Meta } = Card;
  return (
    <React.Fragment>
      <div>
        <Card
          style={{ width: 240, background: "#182938" }}
          cover={<img alt="example" src={props.data.profilePic} />}
        >
          <Meta title={props.data.userName} />
          <Meta description={props.data.email} />
          <Meta description={props.data.rating} />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserCard;
