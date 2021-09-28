import React from "react";
import { Row, Col, Avatar, Button, Divider,Form,Select} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import CallApi from "../hooks/CallApi";
const {Option} = Select;

function UserProfileCard({ data,user,timeslots}) {
    const [form] = Form.useForm();
    
    const onFinish = async (values) => {
        await CallApi("/api/schedule/createInvite","POST",{
            inviteType: "Timeslot Invite",
            senderId: user._id,
            receiverId: data._id,
            timeslotId: values.timeslot
        });
        alert("Invite Sent!");
    }

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
                            {data.firstName ? data.firstName + ' "' : ''}
                            {data.userName}
                            {data.lastName ? '" ' + data.lastName : ''}
                        </h4>
                        <p>{data.location ? data.location : ''}</p>
                        <br></br>
                        <p>{data.bio}</p>
                    </div>
                </Col>
                <Col span={24}><Divider/></Col>
                <Col span={24}>
                    <Row justify="space-around">
                        <Col><Button type="primary">Add Friend</Button></Col>
                        <Col>
                            <Form layout="inline" name="selector" form={form} onFinish={onFinish}>
                                <Form.Item name="timeslot">
                                    <Select placeholder="Choose a slot to invite">
                                        {timeslots.userSchedule.timeslots.map((timeslot,index)=>{
                                            return <Option key={index} value={timeslot._id}>{timeslot.eventTitle}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Invite</Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default connect()(UserProfileCard);
