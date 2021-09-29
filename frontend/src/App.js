import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Spin } from "antd";
import Navigation from "./components/nav/Navigation";
import AuthForms from "./components/auth/AuthForms";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Query from "./components/query/Query";
import { useDispatch } from "react-redux";
import { userAuth, refreshUserData } from "./store/actions/authActions";
import { getSchedule } from "./store/actions/scheduleActions";
import ChangePasswordForm from "./components/auth/ChangePasswordForm";
import UserProfile from "./components/userprofile/UserProfile";
import UpdateProfileForm from "./components/auth/UpdateProfileForm"

export default function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuth()).then(()=>{
            dispatch(getSchedule())
            setLoading(false)
        })
    }, [dispatch]);

    //Remove Later
    useEffect(()=> {
        const refreshSchedule = setInterval(()=>{
            console.log("dispatching refresh...")
            dispatch(refreshUserData())
        },5000)
        return ()=> clearInterval(refreshSchedule)
    },[dispatch])

    return (
        <>
            <Navigation />
            {loading ? (
                <div className="spin-large">
                    <Spin size="large" />
                </div>
            ) : ( 
                <Switch>
                    <Route exact path="/" component={Landing} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/search" component={Query} />
                    <Route path="/profile/:id" component={UserProfile} />
                    <Route path="/login">
                        <AuthForms tab={"login"} />
                    </Route>
                    <Route path="/register">
                        <AuthForms tab={"register"} />
                    </Route>
                    <Route path="/changepassword" component={ChangePasswordForm} />
                    <Route path="/updateprofile" component={UpdateProfileForm} />
                </Switch>
            )}
        </>
    );
}
