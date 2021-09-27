import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import AuthForms from "./components/auth/AuthForms";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Query from "./components/query/Query";
import { useDispatch } from "react-redux";
import { userAuth } from "./store/actions/authActions";
import ChangePasswordForm from "./components/auth/ChangePasswordForm";
import UserProfile from "./components/userprofile/UserProfile";

export default function App() {
    const [loading, setLoading] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAuth()).then(()=>{
            setLoading(true)
        })
    }, [dispatch]);

    return (
        <>
            <Navigation />
            {loading ? (
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
                </Switch>
            ) : ( 
                <p>loading..</p>
            )}
        </>
    );
}
