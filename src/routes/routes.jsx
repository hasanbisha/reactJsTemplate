import React from "react";
import { Redirect, Route } from "react-router-dom";

import { isUserAuthenticated } from "../helpers/authUtils";

const Dashboard = React.lazy(() => import("../containers/Dashboard/Dashboard"));
const NotFound = React.lazy(() => import("../containers/NotFound/NotFound"));

const PrivateRoute = ({ component: Component, roles, ...rest }) => (
  <Route {...rest} render={props => {
    const isAuthTokenValid = isUserAuthenticated();

    if (!isAuthTokenValid) {
      return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    }
    
    // const loggedInUser = getLoggedInUser();
    const loggedInUser = { name: "User", roles: [{ name: "Admin" },{ name: "Employee" }] };
    
    if (roles && !loggedInUser.roles.some(r => roles.includes(r.name))) {
      return <Redirect to={{ pathname: "/" }} />
    }

    return <Component {...props} />
  }} />
);

const routes = [
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard, route: PrivateRoute, roles: ["Admin"] },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute
  },
  { path: "*", exact: true, name: "NotFound", component: NotFound, route: Route },
]

export { routes, PrivateRoute };