import { Tabs } from 'antd'
import Registration from "./Registration";
import LogIn from "./LogIn"
import { useState, useEffect } from "react"

export default function AuthForms({ tab }) {
    const { TabPane } = Tabs;
    const [currentTab, setCurrentTab] = useState("login")

    const handleTabChange = (key) => {
        setCurrentTab(key)
    }

    useEffect(() => {
        setCurrentTab(tab)
    },[tab])

    return (
        <div className="form-container">
            <Tabs 
                defaultActiveKey={tab} 
                activeKey={currentTab} 
                onChange={handleTabChange} 
                style={{ width: 400 }} 
            >
                <TabPane tab="Log in" key="login">
                    <LogIn />
                </TabPane>
                <TabPane tab="Register" key="register">
                    <Registration />
                </TabPane>
            </Tabs>
        </div>
    );
}
