import React  from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import {useState, useEffect} from 'react';
import Axios from 'axios';



const Home = (props) => {
  const { session } = props;

  // if (!session.success) {
  //   swal("You have to be logged in to visit this page!", "Click the button to go to login", "warning");
  //   return <Redirect to="/login"/>
  // }
  
  console.log("props", props)
  let username = localStorage.getItem('user');
  let password = localStorage.getItem('password');
  let agentID = localStorage.getItem('agentID');
  let userMobile = localStorage.getItem('userMobile');
  let authId = localStorage.getItem('authID');
  let authSecretId = localStorage.getItem('authSecretID');
  let dailedNumber = localStorage.getItem('dailedNumber');
  let purchasedNumber  = localStorage.getItem('purchasedNumber');

  const handleLogout=()=>{
    localStorage.setItem('user'," ")
    localStorage.setItem('password'," ")
    localStorage.setItem('agentID'," ")
    localStorage.setItem('userMobile'," ")
    localStorage.setItem('authID'," ")
    localStorage.setItem('authSecretID'," ")
    localStorage.setItem('toNumber'," ")
    
    window.location.href = "/login";

  }
  return (
    <div style={{ fontSize: '2rem' }}>
      Home
      {/* <ul>
        <li>{props.data.selectedUserName}</li>
        <li>{props.data.selectedPassword}</li>
        <li>{props.data.selectedUserMobile}</li>
        <li>{props.data.selectedAgentsId}</li>
      </ul> */}
      <ul>
        <li>user name = {username}</li>
        <li>password ={password}</li>
        <li>To number / customer of the account in vibconnect  ={userMobile}</li>
        <li>agents id = {agentID}</li>
        <li>auth id = {authId}</li>
        <li>auth secret id = {authSecretId}</li>
        <li>From number / Purchased Number / Verified Number= {purchasedNumber}</li>
        <li>XML-Url = {`https://ivrredirect.herokuapp.com/success/91${dailedNumber}`}</li>
      </ul>
      <button onClick={handleLogout}>Log_out</button>
    </div>
  );
}

const mapStateToProps = state =>{
  return {
    session: state.login.session
  }
}

export default connect(mapStateToProps)(Home);