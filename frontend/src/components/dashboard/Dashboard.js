import React from 'react'
import {Layout} from 'antd';
import DashFeed from './DashFeed';
import NotificationFeed from './DashNotification';
const {Content,Sider} = Layout
export default function Dashboard() {
    const siderStyle = {
        backgroundColor:"rgba(0,0,0,0.2)"
    }

    return (
        <Layout style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Sider style={siderStyle} breakpoint="lg" collapsedWidth="0" width={"12vw"}>
                Friends
            </Sider>
            <Content style={{height:"90vh"}}>
                <DashFeed/>
            </Content>
            <Sider style={siderStyle} breakpoint="lg" collapsedWidth="0" trigger={null} width={"16vw"}>
                <NotificationFeed/>
            </Sider>
        </Layout>
    )
}
