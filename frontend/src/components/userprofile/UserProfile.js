import { Tabs, Spin } from "antd";
import UserProfileCard from "./UserProfileCard";
import { connect, useDispatch } from "react-redux"
import { getUserById } from "../../store/actions/userActions";
import { userAuth } from "../../store/actions/authActions";
import { useParams } from "react-router-dom";
import UserSchedule from "../scheduler/UserSchedule";
import { useEffect } from "react"

function UserProfile(props) {
    const { TabPane } = Tabs;
    const { id } = useParams();
    // loggedUser info & schedule
    const { loggedUser } = props.auth;
    const { timeslots } = props.schedule;
    // user profile's info
    const { userProfile, loading, error } = props.user
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserById(id))
        const refreshSchedule = setInterval(()=>{
            console.log("refresh viewed user...")
            dispatch(getUserById(id))
        },5000)
        return ()=> clearInterval(refreshSchedule)
    },[id, dispatch])

    return (
        <>
            <div className="profile-container">
                {loading && <Spin size="large" className="loading-spinner"/>}
                <Tabs defaultActiveKey="1" className="profile-tabs">
                    <TabPane tab="Profile" key="1">
                        {error && <div>{error}</div>}
                        {userProfile && timeslots &&
                            <UserProfileCard data={userProfile} user={loggedUser} timeslots={timeslots}/> 
                        }
                    </TabPane>
                    <TabPane tab="Schedule" key="2">
                        {error && <div>{error}</div>}
                        {userProfile && 
                            <UserSchedule data={userProfile} user={loggedUser}/>
                        }
                    </TabPane>
                    <TabPane tab="Match History" key="3">
                        Coming soon!
                    </TabPane>
                </Tabs>
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        user: state.user,
        schedule: state.schedule,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userAuth: () => dispatch(userAuth()),
        getUserById: (id) => dispatch(getUserById(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);