import React from "react";
import { Row, Col, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

function UserProfileCard({ data }) {
    console.log(data)
    return (
        <div className="card-container">
            <Row>
                <Col span={8}>
                    <div className="avatar-wrapper">
                        <Avatar shape="square" size={200} icon={<UserOutlined />} />
                    </div>
                </Col>
                <Col span={16}>
                    <div className="profile-wrapper">
                        <h4>
                            {/* {data.firstName ? data.firstName + ' "' : ''} */}
                            {data.userName}
                            {/* {data.lastName ? '" ' + data.lastName : ''} */}
                        </h4>
                        <p>Location</p>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default connect()(UserProfileCard);
