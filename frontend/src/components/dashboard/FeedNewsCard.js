import React from 'react'
import {Row,Col,Typography,Image,Divider,Button} from 'antd';
import styles from './feedNewsCard.module.css';

const {Title,Text,Link} = Typography
function FeedNewsCard(props) {
    
    const cardStyle = {
        backgroundColor: "#2E3440",
        color: "#eceff4",
        boxShadow:"1px 1px 4px rgba(0,0,0,0.9)",
        borderRadius: "0.25rem",
        minWidth:"410px"
    }

    return (
        <Col style={cardStyle} span={13}>
            <Row justify="center" style={{margin:"10px 0px"}} gutter={[16,8]}>
                <Col span={24} style={{textAlign:"left",marginTop:"5px"}}>
                    <h3 style={{margin:"auto",color:"#eceff4"}}>{props.data.source.name}</h3>
                    <p>{props.data.publishedAt.split("T")[0]}</p>
                </Col>
                <Col style={{padding:"0"}}>
                    <Image width="100%" src={props.data.image}/>
                </Col>
                <a href={props.data.source.url} target="_blank">
                    <Col span={24} style={{width:"100%"}}>
                        <h6>{props.data.source.url.split("//")[1]}</h6>
                        <h5 style={{margin:"0"}} level={5}>{props.data.title}</h5>
                    </Col>
                </a>
                <Divider style={{margin:"auto",backgroundColor:"rgb(202,203,204)",minWidth:"95%",width:"95%"}}/>
                <Col span={22}>
                    <Row justify="space-between">
                        <Col>0 Likes 0 Dislikes</Col>
                        <Col>0 Shares</Col>
                    </Row>
                </Col>
                <Divider style={{margin:"auto",backgroundColor:"rgb(202,203,204)",minWidth:"95%",width:"95%"}}/>
                <Col span={22}>
                    <Row justify="space-between" style={{color:'white'}}>
                        <Col><Button type="text" style={{color:'white'}}>Like</Button></Col>
                        <Col><Button type="text" style={{color:'white'}}>Disike</Button></Col>
                        <Col><Button type="text" style={{color:'white'}}>Comment</Button></Col>
                        <Col><Button type="text" style={{color:'white'}}>Share</Button></Col>
                    </Row>
                </Col>
            </Row>
        </Col>
    )
}

export default FeedNewsCard;
