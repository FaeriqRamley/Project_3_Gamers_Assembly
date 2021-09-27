import React from 'react';
import {Row,Col,Button} from 'antd';

function NotificationCard(props) {
    console.log(props.data)
    const cardStyle = {
        backgroundColor: "#2E3440",
        color: "#D8DEE9",
        boxShadow:"1px 1px 4px rgba(0,0,0,0.9)",
        borderRadius: "0.25rem",
        padding:"5px"
    }

    let body= <p>Body here</p>
    if (props.data.inviteType === "Timeslot Invite"){
        body = <>
            <p style={{marginBottom:"2px"}}>Has invited you to play <span style={{color:"#D08770",textDecoration:"underline"}}>{props.data.gameName}</span></p>
            <p>{props.data.dayStart} {props.data.timeStart.substring(0,5)}-{props.data.timeEnd.substring(0,5)}</p>
        </>
    } else{
        body = <>
            <p>Wants to be your friend!</p>
        </>
    }

    return (
        <Col style={cardStyle} span={20}>
            <h6 style={{marginBottom:"2px",color:"#eceff4"}}>{props.data.senderName}</h6>
            {body}
            <Row justify="space-around">
                <Col><Button style={{backgroundColor:"#A3BE8C",border:"black"}} shape="round">
                    Accept
                </Button></Col>
                <Col><Button style={{backgroundColor:"#BF616A",border:"black"}} shape="round">
                    Decline
                </Button></Col>
            </Row>
        </Col>
    )
}

export default NotificationCard
