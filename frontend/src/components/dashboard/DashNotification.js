import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import CallApi from '../hooks/CallApi';
import dummyInvites from './dummyInvites';
import NotificationCard from './NotificationCard';
import { useSelector } from 'react-redux';
const {Title} = Typography;

function NotificationFeed() {
    const auth = useSelector(state => state.auth);
    const [invites, setInvites] = useState([]);
    const [notificationInfo,setNotificationInfo] = useState([]);
    const [userLoaded,setUserLoaded] = useState(false);
    const [currentUser,setCurrentUser] = useState(null);
    const [isMounted,setMounted] = useState(false);

    useEffect(()=>{
        if(auth.user){
            setCurrentUser(auth.user.user);
            setUserLoaded(true);
        }
    },[auth])

    useEffect(() => {
        if(currentUser){
            console.log(userLoaded);
            const getInvites = setInterval( async ()=>{
                console.log("fetching...")
                console.log(currentUser._id);
                const receivedInvitesRes = await fetch(`/api/invites/received/${currentUser._id}`);
                const newInviteList = await receivedInvitesRes.json();
                console.log(newInviteList);
                if(newInviteList.length !== invites.length){setInvites(newInviteList)}
                
            },10000)
            
            return () => clearInterval(getInvites);
        }

        
    },[userLoaded])
    
    useEffect(async () => {
        if(isMounted){
            console.log(invites);
            const newNotificationInfo = [];
            for (const invite of invites){
                // console.log(invite);
                const resSender = await fetch(`/api/users/user/${invite.senderId}`);
                const senderData = await resSender.json();
                console.log("sender");
                console.log(senderData);
                // console.log("senderData",senderData);
                // const gameName = await CallApi(Add the game database calling api);
                // if (invite.inviteType === "Timeslot Invite"){
                //     let gameName = "BlackShot";
                //     const resTimeslot = await fetch(`/api/timeslot/${invite.timeslotId}`);
                //     const timeslotData = await resTimeslot.json();
                //     // console.log("timeslotData",timeslotData[0]);

                //     newNotificationInfo.push({
                //         senderName: senderData.userName,
                //         inviteType: invite.inviteType,
                //         gameName: gameName,
                //         dayStart: timeslotData[0].timeStart.split("T")[0],
                //         timeStart: timeslotData[0].timeStart.split("T")[1],
                //         timeEnd: timeslotData[0].timeEnd.split("T")[1],
                //     })                    
                // } else {
                //     newNotificationInfo.push({
                //         senderName: senderData.handleId,
                //         inviteType: invite.inviteType
                //     }) 
                // }
            }
            setNotificationInfo(newNotificationInfo);
        } else {
            setMounted(true);
        }
        
    },[invites])

    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h5>Notifications</h5></Col>
            <Col span={24}>
                <Row justify="center" gutter={[0,16]}>
                    {notificationInfo.map((data,index)=>{
                        return <NotificationCard key={index} data={data}/>
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default NotificationFeed;