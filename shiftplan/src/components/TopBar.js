import React, { Component } from "react";
import logo from "../assets/shiftplan_1.png";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
// import { Authentication } from "../shared/AuthenticationContext";

class TopBar extends Component {
  // static contextType = Authentication;

  render() {
    const { t } = this.props;
    const onSignOutSuccess  = () => {};
    const isSignedIn= false;
    const username  = undefined;
    let links = (
      <ul className="navbar-nav ml-auto">
        <li>
          <Link className="nav-link" to="/signin">
            {t("Sign In")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Sign Up")}
          </Link>
        </li>
      </ul>
    );
    if (isSignedIn) {
      links = (
        <ul className="navbar-nav ml-auto">
          <li>
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className="nav-link"
            onClick={onSignOutSuccess}
            style={{ cursor: "pointer" }}
          >
            {t("Sign Out")}
          </li>
        </ul>
      );
    }

    return (
      <div className="shadow-sm bg-light ">
        <nav className="navbar navbar-expand navbar-light bg-light container">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="40" alt="Shiftplan1"></img> ShiftPlan
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
