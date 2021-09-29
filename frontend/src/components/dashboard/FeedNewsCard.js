import { Col, Image, Card} from 'antd';

function FeedNewsCard(props) {
    return (
        <>
            <Col align="center">
                <Col align="start" span={24}>
                    <Card
                        className="newsfeed-card"
                        hoverable
                        style={{ width: '40vw' }}
                    >
                        <Image width="100%" preview={false} src={props.data.image}/>
                        <a href={props.data.source.url} target="_blank" rel="noreferrer">
                            <div className="newsfeed-details"> 
                                <h5>
                                    {props.data.title} 
                                </h5>
                                <p>
                                    {props.data.source.url.split("//")[1]}
                                </p>
                            </div>
                        </a>
                    </Card>
                </Col>
            </Col>
        </>
    )
}

export default FeedNewsCard;
