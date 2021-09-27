import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import styles from "./userCard.css";

function UserCard() {
  const { Meta } = Card;
  return (
    <React.Fragment>
      <div>
        <Card
          hoverable
          style={{ width: 240, background: "#182938" }}
          cover={
            <img
              alt="example"
              src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            />
          }
        >
          <Meta title="UserName" description="language" />
          <Meta description="age" />
          <Meta description="rating" />
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserCard;
