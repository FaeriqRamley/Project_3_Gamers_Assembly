import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import styles from "./userCard.css";

function UserCard(props) {
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
          {/* <Meta title= {props.data.userName} />
          <Meta description={props.data.email} />
          <Meta description={props.data.rating}/> */}
        </Card>
      </div>
    </React.Fragment>
  );
}

export default UserCard;
