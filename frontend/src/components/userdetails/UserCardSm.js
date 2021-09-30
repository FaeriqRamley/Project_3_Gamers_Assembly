import React from "react";
import "antd/dist/antd.css";
import { Card } from "antd";
import "./userCard.css";
import { Link } from "react-router-dom";

function UserCard(props) {
    // const { Meta } = Card;
    return (
        <>
            <Link to={`/profile/${props.data._id}`}>
                <Card
                    className="cards"
                    style={{
                        width: 250,
                        maxHeight: 360,
                        margin: "20px",
                    }}
                    cover={
                        props.data.image ? (
                            <img alt="user" src={props.data.image} />
                        ) : (
                            <img
                                alt="user"
                                src="https://i.postimg.cc/tC0vfDzr/Screenshot-2021-09-30-at-1-59-38-AM.png"
                            />
                        )
                    }
                >
                    <div className="card-details">
                        <h1>{props.data.userName}</h1>
                        <h2>
                            {props.data.firstName} {props.data.lastName}
                        </h2>
                        <p> {props.data.location}</p>
                    </div>
                </Card>
            </Link>
        </>
    );
}

export default UserCard;
