import React from "react";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import AuthForms from "./components/auth/AuthForms";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import Query from "./components/query/Query";

function App() {
    return (
        <>
            <Navigation />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/search" component={Query} />
                <Route path="/login">
                    <AuthForms tab={"login"} />
                </Route>
                <Route path="/register">
                    <AuthForms tab={"register"} />
                </Route>
            </Switch>
        </>
    );
}

export default App;
