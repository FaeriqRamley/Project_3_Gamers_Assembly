import React from 'react'
import {Row,Col,Typography} from 'antd';
import FeedNewsCard from './FeedNewsCard';
import newsData from './newsData';
const {Title} = Typography;

function DashFeed() {
    console.log(newsData);
    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h2>News Feed</h2></Col>
            <Row justify="center" gutter={[0,32]}>
                {newsData.map(
                    (data) => <FeedNewsCard data={data}/>
                )}
            </Row>

        </Row>
    )
}

export default DashFeed;
