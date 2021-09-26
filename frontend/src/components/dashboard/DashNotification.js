import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import dummyGameId from './dummyGameId';
import dummyInvites from './dummyInvites';
import dummyUserData from './dummyUserData';
import dummyTimeslotData from './dummyTimeslotData';
const {Title} = Typography;

function NotificationFeed() {
    const [invites, setInvites] = useState([]);

    // useEffect(()=>{
    //     const getInvites = setInterval(()=>{
    //         const newInviteList = Insert Fetch Here;
    //         setInvites(newInviteList)
    //     }),1500)
    //     return () => clearInterval(getInvites);

    // },[])

    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h5>Notifications</h5></Col>
            <Row justify="center" gutter={[0,16]}>
            </Row>
        </Row>
    )
}

export default NotificationFeed;