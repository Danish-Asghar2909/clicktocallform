import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { closeSessionAction } from '../../actions/userActions';
import swal from 'sweetalert';
import './header.scss';

import logo from '../../assets/images/app-logo.png';

const Header = ({ session, closeSession }) => {

  const logout = () => {
    swal({
      title: "Are you sure?",
      text: "Your session will be closed",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(willDelete => {
      if (willDelete) {
        closeSession();
        swal("Your session was closed", {
          icon: "success",
        });
        return <Redirect to="/"/>
      }
    });
  }

  const displayButtons = () => {
    if (session.success) {
      return (
        <Link to="#"><button onClick={logout}>Logout</button></Link>
      );
    } else {
      return (
        <Fragment>
          {/* <Link to="/login"><button>Login</button></Link> */}
          <Link to="/register"><button>Register</button></Link>
        </Fragment>
      );
    }
  }

  return (
    <header>
      <figure>
        <Link to="/">
          <img alt="logo" src="https://app.vibconnect.io/static/img/logo.png"/>
        </Link>
      </figure>
      <nav>
        {/* <ul>
          <li><Link to="/">Home</Link></li>
        </ul> */}
      </nav>
      <div id="user-actions">
        {displayButtons()}
      </div>
    </header>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    closeSession: () => dispatch(closeSessionAction())
  }
}

const mapStateToProps = state =>{
  return {
    session: state.login.session
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
