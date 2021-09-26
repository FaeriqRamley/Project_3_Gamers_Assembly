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
            <Sider style={{...siderStyle,left:0}} breakpoint="lg" collapsedWidth="0" width={"12vw"}>
                Friends
            </Sider>
            <Content style={{marginLeft:"12vw",marginRight:"16vw",height:"90vh"}}>
                <DashFeed/>
            </Content>
            <Sider style={{...siderStyle,right:0}} breakpoint="lg" collapsedWidth="0" trigger={null} width={"16vw"}>
                <NotificationFeed/>
            </Sider>
        </Layout>
    )
}
