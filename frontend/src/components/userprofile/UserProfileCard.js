import { useState, useEffect } from "react";
import { Row, Col, Avatar, Button, Divider, Form, Select, Modal, Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import CallApi from "../hooks/CallApi";
const { Option } = Select;

function UserProfileCard({ data, user }) {
    const [isLoggedUser, setIsLoggedUser] = useState(false);
    const [form] = Form.useForm();
    const { timeslots } = user.user.schedule;

    useEffect(() => {
        if (data._id === user.user._id) {
            setIsLoggedUser(true);
        } else {
            setIsLoggedUser(false);
        }
    }, [data, user]);

    const success = () => {
        Modal.success({
            content: "Invite sent!",
        });
    };

    const warning = () => {
        Modal.warning({
            content: `You've already sent an invite`,
        });
    };

    const onFinish = async (values) => {
        const invitations = data.schedule.receivedNotifications;
        // if user is already invited, return; dont run the rest of the code
        for (const data of invitations) {
            if (data.timeslotId._id === values.timeslot) {
                console.log("user has already been invited");
                warning();
                return;
            }
        }

        try {
            await CallApi("/api/schedule/createInvite", "POST", {
                inviteType: "Timeslot Invite",
                senderId: user.user._id,
                receiverId: data._id,
                timeslotId: values.timeslot,
            });

            success();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="card-container">
            <Row>
                <Col span={8}>
                    <div className="avatar-wrapper">
                        {data.image 
                        ? ( <Image
                                width={250}
                                src={data.image}
                            />
                        ) : (
                            <Avatar
                                shape="square"
                                size={250}
                                icon={<UserOutlined />}
                            />
                        )}
                    </div>
                </Col>
                <Col span={16}>
                    <div className="profile-wrapper">
                        <h4 className="upc-username">{data.userName}</h4>
                        <p className="upc-name-location">
                            {data.firstName ? data.firstName : ""}
                            {data.lastName ? ` ${data.lastName}` : ""}
                            {data.location ? `, ${data.location}` : ""}
                        </p>
                        <br></br>
                        <p className="upc-bio">{data.bio}</p>
                    </div>
                </Col>
                {isLoggedUser ? (
                    ""
                ) : (
                    <>
                        <Col span={24}>
                            <Divider />
                        </Col>
                        <Col span={24}>
                            <Row justify="space-around">
                                <Col className="add-friend-btn">
                                    <Button type="primary">Add Friend</Button>
                                </Col>
                                <Col>
                                    <Form
                                        layout="inline"
                                        name="selector"
                                        form={form}
                                        onFinish={onFinish}
                                    >
                                        <Form.Item name="timeslot">
                                            <Select
                                                style={{ width: "250px" }}
                                                placeholder="Choose a slot to invite"
                                            >
                                                {timeslots && timeslots.map(
                                                    (timeslot, index) => {
                                                        return (
                                                            <Option
                                                                key={index}
                                                                value={timeslot._id}
                                                            >
                                                                {timeslot.eventTitle}
                                                            </Option>
                                                        );
                                                    }
                                                )}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                Invite
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                    </>
                )}
            </Row>
        </div>
    );
}

export default connect()(UserProfileCard);
