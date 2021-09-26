import React from 'react'
import {Row,Col,Typography} from 'antd';
import dummyGameId from './dummyGameId';
import dummyInvites from './dummyInvites';
import dummyUserData from './dummyUserData';
import dummyTimeslotData from './dummyTimeslotData';
const {Title} = Typography;

function NotificationFeed() {
    const timestart = new Date("2011-04-11T10:20:30");
    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h5>Notifications</h5></Col>
            <Row justify="center" gutter={[0,16]}>
                {timestart.getTime()}
            </Row>
        </Row>
    )
}

export default NotificationFeed;