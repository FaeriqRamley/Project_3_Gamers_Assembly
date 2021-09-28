import { Tabs, Spin } from "antd";
import UserProfileCard from "./UserProfileCard";
import { connect } from "react-redux"
import { getUserById } from "../../store/actions/userActions";
import { userAuth } from "../../store/actions/authActions";
import { useParams } from "react-router-dom";
import useGetUserId from "../hooks/useGetUserId";
import UserSchedule from "../scheduler/UserSchedule";

function UserProfile(props) {
    const { TabPane } = Tabs;
    const { id } = useParams();
    const { user } = props.auth.user
    const { data, loading, error } = useGetUserId(id);

    return (
        <>
            {error && <div>{error}</div>}
            <div className="profile-container">
                {loading && <Spin size="large" className="loading-spinner"/>}
                {loading ? <Spin size="large" className="loading-spinner"/> :
                <Tabs defaultActiveKey="1" className="profile-tabs">
                    <TabPane tab="Profile" key="1">
                        {data && 
                            <UserProfileCard data={data} user={user} /> 
                        }
                    </TabPane>
                    <TabPane tab="Schedule" key="2">
                       {data && <UserSchedule data={data} user={user}/>}
                    </TabPane>
                    <TabPane tab="Match History" key="3">
                        Coming soon!
                    </TabPane>
                </Tabs>}
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userAuth: () => dispatch(userAuth()),
        getUserById: (id) => dispatch(getUserById(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);