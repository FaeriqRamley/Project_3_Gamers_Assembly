import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import CallApi from '../hooks/CallApi';
import dummyGameId from './dummyGameId';
import dummyInvites from './dummyInvites';
import dummyUserData from './dummyUserData';
import dummyTimeslotData from './dummyTimeslotData';
const {Title} = Typography;

function NotificationFeed() {
    const [invites, setInvites] = useState([]);
    const [notificationInfo,setNotificationInfo] = useState([]);
    const [isMount,setMount] = useState(false);

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
                const res = await fetch(`/api/users/user/61502529197584848369a0b7`);
                const data = await res.json();
                console.log(data);
                // const gameName = await CallApi(Add the game database calling api);
                let gameName = "BlackShot";
                // const timeslot = await CallApi(`/api/timeslot/`,"GET",{_id:`${invite.timeslotId}`});

                // newNotificationInfo.push({
                //     senderName: senderName,
                //     inviteType: invite.inviteType,
                //     gameName: gameName,
                //     dayStart: timeslot.timeStart.split("T")[0],
                //     timeStart: timeslot.timeStart.split("T")[1],
                //     timeEnd: timeslot.timeEnd.split("T")[1],
                // })
            }
        } else {
            setMount(true);
        }
        
    },[invites])

    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h5>Notifications</h5></Col>
            <Row justify="center" gutter={[0,16]}>
            </Row>
        </Row>
    )
}

export default NotificationFeed;