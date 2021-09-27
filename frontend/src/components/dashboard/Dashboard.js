
import React from 'react'
import {Layout} from 'antd';
import DashFeed from './DashFeed';
import NotificationFeed from './DashNotification';
const {Content,Sider} = Layout
export default function Dashboard() {
    const siderStyle = {
        backgroundColor:"rgba(0,0,0,0.2)",
        overflow: 'auto',
        height: '100vh',
        position: 'fixed'
    }

    return (
        <Layout style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Sider style={{...siderStyle,left:0}} breakpoint="lg" collapsedWidth="0" width={"15vw"}>
                Friends
            </Sider>
            <Content style={{marginLeft:"15vw",marginRight:"19vw",height:"90vh"}}>
                <DashFeed/>
            </Content>
            <Sider style={{...siderStyle,right:0}} breakpoint="lg" collapsedWidth="0" trigger={null} width={"19vw"}>
                <NotificationFeed/>
            </Sider>
        </Layout>
    )
}
