// This is the AuthRouting Page

import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/***
 * If user is not login, do not allow to access
 */
export class PrivateRoute extends Component {
  render() {
    const { component: Component, userLogin, ...rest } = this.props;
    const { userInfo } = this.props.userLogin;

    return (
      <Route
        {...rest}
        render={(props) =>
          userInfo ? <Component {...props} /> : <Redirect to={"/userlogin"} />
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userLogin,
});

export default connect(mapStateToProps)(PrivateRoute);
