import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { renderInput } from '../../helpers/inputs';
import { requestTokenAction, createSessionAction } from '../../actions/userActions';
import swal from 'sweetalert';
import Spinner from '../../components/Spinner';
import './styles/login.scss';
import Axios from 'axios';

const Login = (props) => {
  const {token, session, loading, errorLogin, requestToken, createSession} = props;
  console.log(props)
  if (!token.request_token) {
    requestToken();
  }

  if (session.success) {
    return (<Redirect to="/"/>)
  }
let data =[]
  const tableData = async ()=>{
    
    let table = await Axios.get('http://localhost:3000/agents')
    let campaignName = table.data.map((item)=> item)
    console.log("table in import ",table.data.map((item)=> item))
     return campaignName
}

tableData().then(result=> { data = result})
console.log("data is ",data)
// let data = [];
// const fetchData = async()=>{
//   await Axios.get('http://localhost:3000/agents')
// .then(response => console.log("response dot data ",response.data))
// // .then(response=> data=response.data)
// .catch(error => console.log(error))
// }
// fetchData();
// const setData=(item)=>{
//   data = item
// }
// data = fetchData().then(result=>{setData(result)})




  const onSubmit = formValues => {
    console.log(formValues);
    const userData = {
      username: formValues.username,
      password: formValues.password,
      request_token: token.request_token
    }
    createSession(userData);
  }

  // const onSubmit = formValues =>{
  //   console.log(formValues)
  //   Axios.post('http://localhost:3000/agents', formValues)
  //   .then(Response=>console.log("response"))
  //   .catch(error=> console.log("error", error.message))
  // }

  const displayErrors = (errorLogin) => {
    if (errorLogin) {
      if (token.status_message) {
        swal('', token.status_message, 'error');
      }
      if (session.status_message) {
        swal('', session.status_message, 'error');
      }
    }
  }

  return (
    <Fragment>
      {loading ? <Spinner/>
        : <form onSubmit={props.handleSubmit(onSubmit)} id="login-form">
            <Field name="username" component={renderInput} label="Username" type="text" />
            <Field name="password" component={renderInput} label="Password" type="password" />
            <button>Login</button>
          </form>
      }
      {displayErrors(errorLogin)}
    </Fragment>
  );
}

const validate = formValues => {
  const errors = {};

  if (!formValues.username) {
    errors.username = 'You must enter your username';
  }
  if (!formValues.password) {
    errors.password = 'You must enter your password';
  }

  return errors;
}

const mapDispatchToProps = dispatch => {
  return {
    requestToken: () => dispatch(requestTokenAction()),
    createSession: userData => dispatch(createSessionAction(userData))
  }
}

const mapStateToProps = state =>{
  const {token, session, loading, error} = state.login;
  return {
    token,
    session,
    loading,
    errorLogin: error
  }
}

const LoginForm = reduxForm({form: 'login', validate })(Login)
 
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);