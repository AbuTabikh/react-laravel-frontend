import { Route, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
const AuthRoute = ({ component: Component, role:Role, ...rest }) => {
  console.log(Role)
  
  return (
    <Route
    {...rest}
    render={props =>
      rest.loggedIn  &&  ( Role === '' || rest.userRole ==  Role )    ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.auth.loggedIn,
    userRole: state.auth.user.role,

  };
};
export default connect(mapStateToProps)(AuthRoute);