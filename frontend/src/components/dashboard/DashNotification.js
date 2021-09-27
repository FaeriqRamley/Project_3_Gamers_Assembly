import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import CallApi from '../hooks/CallApi';
import NotificationCard from './NotificationCard';
import { useSelector } from 'react-redux';
const {Title} = Typography;

function NotificationFeed() {
    const auth = useSelector(state => state.auth);
    const [fetchedInvites,setFetchedInvites] = useState([]);
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
            const getInvites = setInterval( async ()=>{
                const receivedInvitesRes = await fetch(`/api/invites/received/${currentUser._id}`);
                const newInviteList = await receivedInvitesRes.json();
                setFetchedInvites(newInviteList);
            },1000)
            
            return () => clearInterval(getInvites);
        }
    },[userLoaded])

    useEffect(()=> {
        console.log("This is running");
        if(fetchedInvites.length !== invites.length){
            console.log(fetchedInvites.length);
            console.log(invites.length);
            setInvites(fetchedInvites);
        }
    },[fetchedInvites])
    
    useEffect(async () => {
        if(isMounted){
            console.log("invite change detected");
            // console.log(invites);
            const newNotificationInfo = [];
            for (const invite of invites){
                console.log(invite);
                const resSender = await fetch(`/api/users/user/${invite.senderId}`);
                const senderData = await resSender.json();
                // console.log("sender");
                // console.log(senderData);
                
                if (invite.inviteType === "Timeslot Invite"){
                    // const gameName = await CallApi(Add the game database calling api);
                    const resTimeslot = await fetch(`/api/timeslot/byTimeslotId/${invite.timeslotId}`);
                    const timeslotData = await resTimeslot.json();
                    console.log("timeslotData",timeslotData);

                    newNotificationInfo.push({
                        senderName: senderData.userName,
                        inviteType: invite.inviteType,
                        inviteId: invite._id,
                        gameName: "Dota 2",
                        dayStart: timeslotData.timeStart.split("T")[0],
                        timeStart: timeslotData.timeStart.split("T")[1],
                        timeEnd: timeslotData.timeEnd.split("T")[1],
                    })
                } else {
                    newNotificationInfo.push({
                        senderName: senderData.handleId,
                        inviteType: invite.inviteType,
                        inviteId: invite._id
                    })
                }
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