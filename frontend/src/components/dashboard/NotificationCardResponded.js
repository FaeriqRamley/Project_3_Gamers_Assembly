import React,{useState} from 'react';
import {Row,Col,Button} from 'antd';
import CallApi from '../hooks/CallApi';

function NotificationCardResponded(props) {
    const notif = props.data;
    console.log("Notif Card props.data",notif);
    const [loading,setLoading] = useState(false);

    const cardStyle = {
        backgroundColor: "#2E3440",
        color: "#D8DEE9",
        boxShadow:"1px 1px 4px rgba(0,0,0,0.9)",
        borderRadius: "0.25rem",
        padding:"5px"
    }

    const response = notif.status === "Accepted" ? <b style={{color:"#A3BE8C"}}>Accepted</b>: <b style={{color:"#BF616A"}}>Declined</b>

    let body= <p>Body here</p>
    if (notif.inviteType === "Timeslot Invite"){
        const timeslot = props.data.timeslotInfo;
        if(timeslot){
            const {timeStart,timeEnd} = props.data.timeslotInfo;
            body = <>
                <p style={{marginBottom:"2px"}}>Has {response} to play <span style={{color:"#D08770",textDecoration:"underline"}}>{timeslot.eventTitle}</span></p>
                <p style={{marginBottom:"0px"}}>{timeStart.split("T")[0]}</p>
                <p>{timeStart.split("T")[1].substring(0,5)}-{timeEnd.split("T")[1].substring(0,5)}</p>
            </>
        } else {
            body = <>
                <p>Oops... the event was deleted. Btw {props.data.receiverName} did say {notif.status === "Accepted" ? <b style={{color:"#A3BE8C"}}>Yes :D</b>: <b style={{color:"#BF616A"}}>No :\</b>}</p>
            </>
        }
    } else{
        body = <>
            <p>Has {response} your friend request</p>
        </>
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(e.target.innerText);
        console.log(props.data.inviteId);
        setLoading(true);
        await CallApi(`/api/schedule/clearInvite`,"Delete",{inviteId:notif.inviteId,senderId:notif.senderId})
        setTimeout(() => {
           setLoading(false);
        }, 2000);
    }

    return (
        <Col style={cardStyle} span={20}>
            <h6 style={{marginBottom:"2px",color:"#eceff4"}}>{props.data.receiverName}</h6>
            {body}
            <Row justify="space-around">
                <Col><Button style={{backgroundColor:"#BF616A",border:"black"}} shape="round" onClick={handleClick} loading={loading}>
                    Clear
                </Button></Col>
            </Row>
        </Col>
    )
}

export default NotificationCardResponded;
