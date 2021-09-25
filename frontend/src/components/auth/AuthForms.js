import { Tabs } from 'antd'
import Registration from "./Registration";
import LogIn from "./LogIn"

export default function AuthForms({ tab }) {
    const { TabPane } = Tabs;

    return (
        <div className="form-container">
            <Tabs defaultActiveKey={tab} type="card" style={{ width: 400 }} >
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
