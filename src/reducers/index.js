import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

export default combineReducers({
  form: formReducer,
  login: loginReducer,
  register: registerReducer
});