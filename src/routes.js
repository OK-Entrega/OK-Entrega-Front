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
import VerifyAccount from "./pages/account/verify-account/verify-account";
import RequestNewPassword from "./pages/account/i-forgot-my-password/request-new-password";
import ChangePassword from "./pages/account/i-forgot-my-password/change-password";
import MyCompanies from "./pages/my-companies/my-companies"; 
import Dashboard from "./pages/dashboard/dashboard";
import Shippers from "./pages/shippers/shippers";
import OrdersPending from "./pages/orders/orders-pending";
import OrdersHistory from "./pages/orders/orders-history";
import Records from "./pages/records/records";
import GeoreferencingOfRecords from "./pages/georeferencing-of-records/georeferencing-of-records";
import NotFound from "./pages/notfound/notfound";

import { jwt, discriminator } from "./constants";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const PrivateRouteSignedIn = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={
            props =>
                jwt !== null && discriminator === "Shipper" ?
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
                    <Redirect to={{ pathname: "/my-companies", state: { from: props.location } }} />
        }
    />
);

const routes = (
    <Router>
        <Switch>
            <PrivateRouteNotSignedIn exact path="/" component={Home} />
            <PrivateRouteNotSignedIn path="/signin" component={SignIn} />
            <PrivateRouteNotSignedIn path="/signup" component={SignUp} />
            <PrivateRouteNotSignedIn path="/verify-account/:shipperId" component={VerifyAccount} />
            <PrivateRouteNotSignedIn path="/i-forgot-my-password/request-new-password" component={RequestNewPassword} />
            <PrivateRouteNotSignedIn path="/i-forgot-my-password/change-password/:token" component={ChangePassword} />

            <PrivateRouteSignedIn exact path="/my-companies" component={MyCompanies} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/dashboard" component={Dashboard} /> 
            <PrivateRouteSignedIn path="/my-companies/:companyId/orders/pending" component={OrdersPending} /> 
            <PrivateRouteSignedIn path="/my-companies/:companyId/orders/history" component={OrdersHistory} /> 
            <PrivateRouteSignedIn path="/my-companies/:companyId/records" component={Records} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/georeferencing-of-records" component={GeoreferencingOfRecords} />
            <PrivateRouteSignedIn path="/my-companies/:companyId/shippers" component={Shippers} />
            <Route component={NotFound}/>
        </Switch>
    </Router>
)

export default routes;