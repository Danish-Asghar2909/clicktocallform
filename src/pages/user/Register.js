import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { renderInput, renderInputRadio, renderInputSelect } from '../../helpers/inputs';
import { registerNewUserAction, clearRegisterAction } from '../../actions/userActions';
import swal from 'sweetalert';
import moment from 'moment';
import Spinner from '../../components/Spinner';
import './styles/register.scss';
import Axios from 'axios';

const Register = (props) => {
  const { registerForm = {}, user, loading, errorRegister, registerNewUser, clearRegister } = props;
  const {values: {country = ''} = {}} = registerForm;

  if (user.id) {
    swal('The user was registered!', 'Click the button to go to login', 'success');
    clearRegister();
    return <Redirect to="/login"/>
  }

  const onSubmit = formValues => {
    console.log(formValues);
    const newUser = {
      username: formValues.username,
      password: formValues.password,
      userMobile: formValues.userMobile,
      agentID: formValues.agentID
    }
    Axios.post('http://localhost:3000/agents', newUser)
    .then(response=> console.log(response))
    .catch(error=> console.log(error))
    alert("form submitted")
    formValues.username=""
    formValues.password=""
    formValues.userMobile=""
    formValues.agentID=""
    // registerNewUser(newUser);
  }

  const displayErrors = (errorRegister) => {
    if (errorRegister) {
      swal('', user.status_message, 'error');
    }
  }

  // THE API HAS SOME LIMITATIONS AND DOES NOT ALLOW NEW USERS TO POST, BUT IT DOES WORK WITH THE EXAMPLE DATA
  // email: eve.holt@reqres.in
  // password: pistol
  // THE RESPONSE OF THE API AND THE USER DATA IS STORED IN THE STATE ONLY FOR THIS EXAMPLE AND TO VIEW THE INFORMATION
  // THE API GIVE US AN ID AND A TOKEN AFTER THE REGISTER OF THE USER

  return (
    <Fragment>
      {loading ? <Spinner/>
        : <form onSubmit={props.handleSubmit(onSubmit)} id="register-form">
            {/* <Field name="firstname" component={renderInput} label="Firstname" type="text" /> */}
            <Field name="agentID" component={renderInput} label="Agents ID" type="text" />
            <Field name="username" component={renderInput} label="Email" type="email" />
            <Field name="password" component={renderInput} label="Password" type="password" />
            {/* <Field name="passwordConfirmation" component={renderInput} label="Repeat Password" type="password" /> */}
            {/* <Field name="birthday" component={renderInput} label="Birthday" type="date" /> */}
            <Field name="userMobile" component={renderInput} label="Telephone Number" type="text" />
            {/* <Field name="personalSiteUrl" component={renderInput} label="Personal Site URL" type="url" /> */}
            {/* <Field name="aboutMe" component={renderInput} label="About Me" type="text" /> */}
            {/* <div className="field">
              <label>Genre</label>
              <Field name="genre" component={renderInputRadio} label="Male" type="radio"  value="male" />
              <Field name="genre" component={renderInputRadio} label="Female" type="radio"  value="female" />
            </div> */}
            {/* <div className="field">
              <label>Address</label>
              <Field name="country" component={renderInputSelect} label="Country" />
              {country && <Field name="state" component={renderInputSelect} label="State" country={registerForm.values.country.replace(' ','')} />}
            </div> */}
            {/* <Field name="agree" component={renderInput} label="I'm agree" type="checkbox"/> */}
            <button>Register</button>
          </form>
      }
      {displayErrors(errorRegister)}
    </Fragment>
  );
}

const validate = formValues => {
  const errors = {};

  if (!formValues.firstname) {
    errors.firstname = 'You must enter your firstname';
  } else if (formValues.firstname.length < 4 || formValues.firstname.length > 15) {
    errors.firstname = 'The character numbers for this field must be between 4 and 15';
  }

  if (!formValues.lastname) {
    errors.lastname = 'You must enter your lastname';
  } else if (formValues.lastname.length < 4 || formValues.lastname.length > 15) {
    errors.lastname = 'The character numbers for this field must be between 4 and 15';
  }

  if (!formValues.email) {
    errors.email = 'You must enter your email';
  } else {
    const expRegMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!expRegMail.test(formValues.email)) {
      errors.email = 'Enter a valid email';
    }
  }

  if (!formValues.password) {
    errors.password = 'You must enter your password';
  }
  if (!formValues.passwordConfirmation) {
    errors.passwordConfirmation = 'You must confirm your password';
  } else if (formValues.password !== formValues.passwordConfirmation) {
    errors.passwordConfirmation = 'Your passwords are different';
  }

  if (!formValues.birthday) {
    errors.birthday = 'You must enter your birthday';
  } else {
    const today = moment(new Date());
    const birthday = moment(new Date(formValues.birthday));
    if (birthday > today) {
      errors.birthday = 'You cannot enter a date greater than today';
    } else {
      if (today.diff(birthday, 'days') / 365.25 < 18) {
        errors.birthday = 'You have to be over 18 years old';
      }
    }
  }

  if (!formValues.telephone) {
    errors.telephone = 'You must enter your telephone number';
  } else if (isNaN(formValues.telephone)) {
    errors.telephone = 'This field only has to contain numbers';
  }

  if (!formValues.genre) {
    errors.genre = 'You must select your genre';
  }
  if (!formValues.country) {
    errors.country = 'You must select your country';
  }
  if (!formValues.state) {
    errors.state = 'You must select your state';
  }
  if (!formValues.agree) {
    errors.agree = 'You must agree to terms and conditions';
  }

  return errors;
}

const mapDispatchToProps = dispatch => {
  return {
    registerNewUser: userData => dispatch(registerNewUserAction(userData)),
    clearRegister: () => dispatch(clearRegisterAction())
  }
}

const mapStateToProps = state => {
  return {
    registerForm: state.form.register,
    user: state.register.user,
    loading: state.register.loading,
    errorRegister: state.register.error
  };
}

const RegisterForm = reduxForm({form: 'register', validate })(Register);

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);