import React from 'react'
import {Layout} from 'antd';

const {Content,Sider} = Layout
export default function Dashboard() {

    const siderStyle = {
        backgroundColor:"rgba(0,0,0,0.2)",
        minWidth:"300px"
    }


    return (
        <Layout style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Sider style={siderStyle} breakpoint="lg" collapsedWidth="0" width={"12vw"}>
                Friends
            </Sider>
            <Content style={{minHeight:"90vh"}}>
                Content
            </Content>
            <Sider style={siderStyle} breakpoint="lg" collapsedWidth="0" trigger={null} width={"16vw"}>
                Notifications
            </Sider>
        </Layout>
    )
}
