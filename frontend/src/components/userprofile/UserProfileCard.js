import { useState, useEffect } from "react";
import { Row, Col, Avatar, Button, Divider, Form, Select, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import CallApi from "../hooks/CallApi";
const {Option} = Select;

function UserProfileCard({ data, user }) {
    const [isLoggedUser, setIsLoggedUser] = useState(false)
    const [form] = Form.useForm();
    const { timeslots } = user.user.schedule

    useEffect(()=>{
        if(data._id === user.user._id){
            setIsLoggedUser(true)
        } else{
            setIsLoggedUser(false)
        }
    },[data, user])

    const success = () => {
        Modal.success({
            content: 'Invite sent!',
            onOk() {
                console.log('close success modal')
            }
        });
    }
    
    const onFinish = async (values) => {
        try {
            await CallApi("/api/schedule/createInvite","POST",{
                inviteType: "Timeslot Invite",
                senderId: user.user._id,
                receiverId: data._id,
                timeslotId: values.timeslot
            })

            success();
        } catch (err) {
            console.log(err)
        }
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
                        <h4 className="upc-username">
                            {data.userName}
                        </h4>
                        <p className="upc-name-location">
                            {data.firstName ? data.firstName : ''}
                            {data.lastName ? ` ${data.lastName}` : ''}
                            {data.location ?  `, ${data.location}` : ''}</p>
                        <br></br>
                        <p className="upc-bio">{data.bio}</p>
                    </div>
                </Col>
                {isLoggedUser 
                ? ( '' 
                ) : ( 
                    <>
                        <Col span={24}><Divider/></Col>
                        <Col span={24}>
                            <Row justify="space-around">
                                <Col><Button type="primary">Add Friend</Button></Col>
                                <Col>
                                    <Form layout="inline" name="selector" form={form} onFinish={onFinish}>
                                        <Form.Item name="timeslot">
                                            <Select placeholder="Choose a slot to invite">
                                                {timeslots.map((timeslot,index)=>{
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
                    </>
                )}
            </Row>
        </div>
    );
}

export default connect()(UserProfileCard);
