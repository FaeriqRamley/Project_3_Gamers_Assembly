import React,{useState,useEffect} from 'react'
import {Row,Col} from 'antd';
import { useSelector } from 'react-redux';
import NotificationCardReceived from './NotificationCardReceived';
import NotificationCardResponded from './NotificationCardResponded';

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
                const allNotifs = []
                const receivedNotifsRes = await fetch(`/api/schedule/populate/notifications`);
                const receivedNotifsJSON = await receivedNotifsRes.json();
                const receivedNotifs = receivedNotifsJSON.userSchedule.receivedNotifications;
                const sentNotifs = receivedNotifsJSON.userSchedule.sentNotifications;
                for (const notif of receivedNotifs){
                    allNotifs.push({type:"received",item:notif});
                }
                for (const notif of sentNotifs){
                    if(notif.status !== "Pending"){
                        allNotifs.push({type:"responded",item:notif});
                    }
                }
                setFetchedInvites(allNotifs);
            },2000)
            
            return () => clearInterval(getInvites);
        }
    },[currentUser,userLoaded])

    useEffect(()=> {
        if(fetchedInvites.length !== invites.length){
            console.log(fetchedInvites.length);
            console.log(invites.length);
            setInvites(fetchedInvites);
        }
    },[fetchedInvites])
    
    useEffect(async () => {
        if(isMounted){
            const tempArray = [];
            for (const notif of invites){
                const {item} = notif;
                
                const newObj = {
                    inviteId: item._id,
                    inviteType: item.inviteType,
                    notifType: notif.type,
                    status: item.status,
                    senderName: item.senderId.userName,
                    senderId: item.senderId._id,
                    receiverName: item.receiverId.userName
                }
                
                if (item.inviteType === "Timeslot Invite"){
                    newObj["timeslotInfo"] = item.timeslotId;
                }

                tempArray.push(newObj);
            }
            setNotificationInfo(tempArray);
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
                        if(data.notifType==="received"){
                            return <NotificationCardReceived key={index} data={data}/>
                        } else {
                            return <NotificationCardResponded key={index} data={data}/>
                        }
                        
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default NotificationFeed;