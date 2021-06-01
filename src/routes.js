import React from 'react';
import $ from 'jquery';

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

import Home from "./pages/home/home";
import SignIn from "./pages/account/signin/signin";
import SignUp from "./pages/account/signup/signup";
import RequestNewPassword from "./pages/account/i-forgot-my-password/request-new-password";
import ChangePassword from "./pages/account/i-forgot-my-password/change-password";
import Dashboard from "./pages/dashboard/dashboard";
import Shippers from "./pages/shippers/shippers";
import Orders from "./pages/orders/orders";
import Field from "./pages/field/field";
import Map from "./pages/map/map";

import { jwt, discriminator } from "./constants";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const PrivateRouteSignedIn = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props =>
                /*jwt !== null && discriminator === "Shipper"*/true ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        }
    />
);

const PrivateRouteNotSignedIn = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props =>
                jwt === null ?
                    <Component {...props} /> :
                    <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
        }
    />
);

const routes = (
    <Router>
        <Switch>
            <PrivateRouteNotSignedIn exact path="/" component={Home} />
            <PrivateRouteNotSignedIn path="/signin" component={SignIn} />
            <PrivateRouteNotSignedIn path="/signup" component={SignUp} />
            <PrivateRouteNotSignedIn path="/i-forgot-my-password/request-new-password" component={RequestNewPassword} />
            <PrivateRouteNotSignedIn path="/i-forgot-my-password/change-password/:token" component={ChangePassword} />

            <PrivateRouteSignedIn exact path="/my-companies" />
            <PrivateRouteSignedIn path="/my-companies/:companyId/dashboard" component={Dashboard} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/orders" component={Orders} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/field" component={Field} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/map" component={Map} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/shippers" component={Shippers} />
        </Switch>
    </Router>
)

export default routes;