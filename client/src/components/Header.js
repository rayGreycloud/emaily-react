import React, { Component } from "react";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    // Test prop connection
    console.log(this.props);

    return (
      <nav>
        <div className="nav-wrapper">
          <a className="brand-logo left">Emaily</a>
          <ul id="nav-mobile" className="right">
            <li>
              <a>Login With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}
// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

export default connect(mapStateToProps)(Header);
