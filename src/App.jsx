import React, { lazy, Suspense, Component } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { routes } from "./routes/routes";
import Loading from "./components/Loading";

import { isUserAuthenticated } from "./helpers/authUtils";
import { connect } from "react-redux";

import "./assets/css/General.css";

const AuthLayoutComponent = lazy(() => import("./components/AuthLayout"));

const AuthLayout = props => (
  <Suspense fallback={<Loading />}>
    <AuthLayoutComponent {...props} />
  </Suspense>
);

const NonAuthLayoutComponent = lazy(() => import("./components/NonAuthLayout"));

const NonAuthLayout = props => (
  <Suspense fallback={<Loading />}>
    <NonAuthLayoutComponent {...props} />
  </Suspense>
);

const withLayout = (WrappedComponent) => {
    const HOC = class extends Component {
      render() {
        return <WrappedComponent {...this.props} />;
      }
    };
  
    return connect()(HOC);
}

const App = () => {
    const getLayout = () => {
      return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
    }

    return (
      <Router>
        <Switch>
          {routes.map((route, index) => {
            return (
              <route.route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  roles={route.roles}
                  component={withLayout(props => {
                      const Layout = getLayout();
                      return (
                        <Suspense fallback={<Loading />}>
                          <Layout {...props}>
                            <route.component {...props} />
                          </Layout>
                        </Suspense>
                      );
                  })}
              />
            );
          })}
        </Switch>
      </Router>  
    );
};

export default App;
