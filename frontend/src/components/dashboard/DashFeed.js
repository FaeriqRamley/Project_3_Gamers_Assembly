import React,{useState,useEffect} from 'react'
import {Row,Col,Tag,Divider} from 'antd';
import FeedNewsCard from './FeedNewsCard';
import newsData from './dummyNewsData';
const { CheckableTag } = Tag;

function DashFeed() {
    const [selectedTags,setSelectedTags] = useState([]);
    const [newsDisplay,setNewsDisplay] = useState(newsData);
    const tagsData = ['League of Legends','Dota 2','Valorant','Overwatch'];
    
    const handleChange = (tag, checked) => {
      const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
      setSelectedTags(nextSelectedTags);
    }

    useEffect(() => {
        if(selectedTags.length === 0){
            setNewsDisplay(newsData);
        } else {
            const combinedData = newsData.map((item)=>{
                return Object.values(item).join(" ");
            })
            const filterOutcomes = combinedData.map((item)=> {
                    let counter = 0;
                    for (const tag of selectedTags){
                        item.includes(tag) ? counter+=1 : counter+=0
                    }
                    return counter > 0
                })
            const filteredNews = newsData.filter((item,index) => filterOutcomes[index])
            setNewsDisplay(filteredNews);
        }

    }, [selectedTags])

    return (
        <Row style={{padding:"10px"}} >
            <Col span={24}><h2>News Feed</h2></Col>
            <Divider/>
            <Col span={24}>
                <span style={{ marginRight: 8 }}>Categories:</span>
                {tagsData.map(tag => (
                    <CheckableTag
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => handleChange(tag, checked)}
                    >
                        {tag}
                    </CheckableTag>))}
            </Col>
            <Divider/>
            <Row justify="center" gutter={[0,32]}>
                {newsDisplay.map(
                    (data,index) => <FeedNewsCard key={index} data={data}/>
                )}
            </Row>
        </Row>
    )
}

export default DashFeed;
