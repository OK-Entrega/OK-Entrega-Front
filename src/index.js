import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "./index.css";

//Packages
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

//Components
import SignIn from "./pages/account/signin/signin";
import SignUp from "./pages/account/signup/signup";
import RequestNewPassword from "./pages/account/i-forgot-my-password/request-new-password";
import ChangePassword from "./pages/account/i-forgot-my-password/change-password";
import Dashboard from "./pages/dashboard/dashboard";
import Shippers from "./pages/shippers/shippers";
import Orders from "./pages/orders/orders";
import Field from "./pages/field/field";
import Map from "./pages/map/map";

//Constants
import { jwt, discriminator } from "./utils/constants";

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

const routing = (
    <Router>
        <Switch>
            <PrivateRouteNotSignedIn exact path="/" />
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

ReactDOM.render(
    <React.StrictMode>
        {routing}
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.unregister();
