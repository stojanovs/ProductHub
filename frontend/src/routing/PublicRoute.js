// This is the AuthRouting Page

import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

/***
 * If user is login, do not allow to access
 */
export class PublicRoute extends Component {
  render() {
    const { component: Component, userLogin, ...rest } = this.props;
    const { userInfo } = this.props.userLogin;

    return (
      <Route
        {...rest}
        render={(props) =>
          !userInfo ? <Component {...props} /> : <Redirect to={"/"} />
        }
      />
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.userLogin,
});

export default connect(mapStateToProps)(PublicRoute);
