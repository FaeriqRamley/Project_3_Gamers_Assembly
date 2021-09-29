import React from 'react'
import {Layout} from 'antd';
import DashFeed from './DashFeed';
import NotificationFeed from './DashNotification';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"


function Dashboard(props) {
    const { Content, Sider } = Layout
    const { loggedUser } = props.auth;

    const siderStyle = {
        backgroundColor:"rgba(0,0,0,0.2)",
        overflow: 'auto',
        height: '100vh',
        position: 'fixed'
    }

    if (!loggedUser) return <Redirect to="/login" />

    return (
        <Layout style={{backgroundColor:"rgba(0,0,0,0)"}}>
            <Sider style={{...siderStyle,left:0}} breakpoint="lg" collapsedWidth="0" width={"15vw"}>
                Friends
            </Sider>
            <Content style={{marginLeft:"15vw",marginRight:"19vw",height:"90vh",overflow:"auto"}}>
                <DashFeed/>
            </Content>
            <Sider style={{...siderStyle,right:0}} breakpoint="lg" collapsedWidth="0" trigger={null} width={"19vw"}>
                <NotificationFeed/>
            </Sider>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
    };
};

export default connect(mapStateToProps)(Dashboard)