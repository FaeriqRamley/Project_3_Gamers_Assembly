import React,{useState} from 'react';
import {Row,Col,Button} from 'antd';
import CallApi from '../hooks/CallApi';

function NotificationCard(props) {
    const notif = props.data;
    const [loading,setLoading] = useState(false);

    const cardStyle = {
        backgroundColor: "#2E3440",
        color: "#D8DEE9",
        boxShadow:"1px 1px 4px rgba(0,0,0,0.9)",
        borderRadius: "0.25rem",
        padding:"5px"
    }

    let body= <p>Body here</p>
    if (notif.inviteType === "Timeslot Invite"){
        const timeslot = props.data.timeslotInfo;
        const {timeStart,timeEnd} = props.data.timeslotInfo;
        body = <>
            <p style={{marginBottom:"2px"}}>Has invited you to play <span style={{color:"#D08770",textDecoration:"underline"}}>{timeslot.eventTitle}</span></p>
            <p>{timeStart.split("T")[0]}</p>
            <p>{timeStart.split("T")[1].substring(0,5)}-{timeEnd.split("T")[1].substring(0,5)}</p>
        </>
    } else{
        body = <>
            <p>Wants to be your friend!</p>
        </>
    }

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(e.target.innerText);
        console.log(props.data.inviteId);
        setLoading(true);
        await CallApi(`/api/schedule/respondInvite/${e.target.innerText}`,"PUT",{inviteId:notif.inviteId})
        setTimeout(() => {
           setLoading(false);
        }, 2000);
    }

    return (
        <Col style={cardStyle} span={20}>
            <h6 style={{marginBottom:"2px",color:"#eceff4"}}>{props.data.senderName}</h6>
            {body}
            <Row justify="space-around">
                <Col><Button style={{backgroundColor:"#A3BE8C",border:"black"}} shape="round" onClick={handleClick} loading={loading}>
                    Accept
                </Button></Col>
                <Col><Button style={{backgroundColor:"#BF616A",border:"black"}} shape="round" onClick={handleClick} loading={loading}>
                    Decline
                </Button></Col>
            </Row>
        </Col>
    )
}

export default NotificationCard;
