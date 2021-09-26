import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import CallApi from '../hooks/CallApi';
import dummyInvites from './dummyInvites';
const {Title} = Typography;

function NotificationFeed() {
    const [invites, setInvites] = useState([]);
    const [notificationInfo,setNotificationInfo] = useState([]);
    const [isMount,setMount] = useState(true);

    useEffect(()=>{
        setInvites(dummyInvites);
    },[])

    // // useEffect(() => {
    // //     const getInvites = setInterval(()=>{
    // //         const newInviteList = Insert Fetch Here;
    // //         if(newInviteList !== invites){setInvites(newInviteList)}
    // //         
    // //     }),1500)
    // //     return () => clearInterval(getInvites);
    // // },[])
    
    useEffect(async () => {
        if(isMount){
            console.log("mounted");
            const newNotificationInfo = [];
            for (const invite of invites){
                console.log(invite);
                const resSender = await fetch(`/api/users/user/61502529197584848369a0b7`);
                const senderData = await resSender.json();
                console.log("senderData",senderData);
                // const gameName = await CallApi(Add the game database calling api);
                let gameName = "BlackShot";
                const resTimeslot = await fetch(`/api/timeslot/${invite.timeslotId}`);
                const timeslotData = await resTimeslot.json();
                console.log("timeslotData",timeslotData[0]);

                newNotificationInfo.push({
                    senderName: senderData.handleId,
                    inviteType: invite.inviteType,
                    gameName: gameName,
                    dayStart: timeslotData[0].timeStart.split("T")[0],
                    timeStart: timeslotData[0].timeStart.split("T")[1],
                    timeEnd: timeslotData[0].timeEnd.split("T")[1],
                })
            }
            setNotificationInfo(newNotificationInfo);
        } else {
            setMount(true);
        }
        
    },[invites])

    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h5>Notifications</h5></Col>
            <Row justify="center" gutter={[0,16]}>
                {notificationInfo.map((data)=>{
                    return JSON.stringify(data)
                })}
            </Row>
        </Row>
    )
}

export default NotificationFeed;