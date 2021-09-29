import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import "./userCard.css";
import { Link } from "react-router-dom";

function UserCard(props) {
  // const { Meta } = Card;
  return (
    <React.Fragment>
      <div>
        <Link to={`/profile/${props.data._id}`}>
          <Card
            className="cards"
            style={{
              width: 250,
              maxHeight: 360,
              background: "#182938",
              margin: "auto",
            }}
            cover={<img alt="example" src={props.data.profilePic} />}
          >
            <div>
              <h1>{props.data.userName}</h1>
              <h2>
                {props.data.firstName} {props.data.lastName}
              </h2>
              {/* <h3>{props.data.location}</h3> */}
              <p> {props.data.location}</p>
            </div>
          </Card>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default UserCard;
