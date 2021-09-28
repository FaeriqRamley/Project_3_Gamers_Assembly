import React,{useState,useEffect} from 'react'
import {Row,Col,Typography} from 'antd';
import CallApi from '../hooks/CallApi';
import NotificationCard from './NotificationCard';
import { useSelector,useDispatch } from 'react-redux';

const {Title} = Typography;

function NotificationFeed() {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
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
            },5000)
            
            return () => clearInterval(getInvites);
        }
    },[userLoaded])

    useEffect(()=> {
        console.log("Checking for notification changes");
        if(fetchedInvites.length !== invites.length){
            console.log(fetchedInvites.length);
            console.log(invites.length);
            setInvites(fetchedInvites);
        }
    },[fetchedInvites])
    
    useEffect(async () => {
        if(isMounted){
            console.log("invite change detected");
            const tempArray = [];
            for (const notif of invites){
                const {item} = notif;
                
                const newObj = {
                    inviteId: item._id,
                    inviteType: item.inviteType,
                    notifType: notif.type,
                    status: item.status,
                    senderName: item.senderId.userName,
                    receiverName: item.receiverId.userName
                }
                
                if (item.inviteType === "Timeslot Invite"){
                    console.log("it's a timeslot Invite");
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
                        return <NotificationCard key={index} data={data}/>
                    })}
                </Row>
            </Col>
        </Row>
    )
}

export default NotificationFeed;