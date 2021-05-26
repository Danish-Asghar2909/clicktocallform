import { requestToken, createSession } from '../apis/themoviedb';
import { registerNewUser } from '../apis/reqres';

export const types = {
  REQUEST_TOKEN_REQUEST: 'REQUEST_TOKEN_REQUEST',
  REQUEST_TOKEN_SUCCESS: 'REQUEST_TOKEN_SUCCESS',
  REQUEST_TOKEN_FAILUE: 'REQUEST_TOKEN_FAILUE',
  CREATE_SESSION_REQUEST: 'CREATE_SESSION_REQUEST',
  CREATE_SESSION_SUCCESS: 'CREATE_SESSION_SUCCESS',
  CREATE_SESSION_FAILURE: 'CREATE_SESSION_FAILURE',
  CLOSE_SESSION: 'CLOSE_SESSION',

  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  CLEAR_REGISTER: 'CLEAR_REGISTER'
};

export const requestTokenAction = () => async dispatch => {
  dispatch({
    type: types.REQUEST_TOKEN_REQUEST,
  });
  requestToken()
  .then(token => {
    if (token.data.success) {
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem('token-themoviedb', JSON.stringify(token.data));
      }
      dispatch({
        type: types.REQUEST_TOKEN_SUCCESS,
        payload: {
          token: token.data
        }
      });
  
    } else {
      dispatch({
        type: types.REQUEST_TOKEN_FAILUE,
        payload: {
          token: token.data
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: types.REQUEST_TOKEN_FAILUE,
      payload: {
        token: {
          status_message: 'The token cannot be generated'
        }
      }
    });
  });
}

export const createSessionAction = userData => async dispatch => {
  dispatch({
    type: types.CREATE_SESSION_REQUEST,
  });
  createSession(userData)
  .then(session => {
    if (session.data.success) {
      dispatch({
        type: types.CREATE_SESSION_SUCCESS,
        payload: {
          session: session.data
        }
      });
      
    } else {
      dispatch({
        type: types.CREATE_SESSION_FAILURE,
        payload: {
          session: session.data
        }
      });
    }
  })
  .catch(() => {
    dispatch({
      type: types.CREATE_SESSION_FAILURE,
      payload: {
        session: {
          status_message: 'Invalid username and/or password'
        }
      }
    });
  });
}

export const closeSessionAction = () => {
  localStorage.removeItem('token-themoviedb');
  return {
    type: types.CLOSE_SESSION
  }
}

export const registerNewUserAction = userData => async dispatch => {
  console.log(userData);
  dispatch({
    type: types.REGISTER_REQUEST,
  });
  registerNewUser(userData)
  .then(response => {
    dispatch({
      type: types.REGISTER_SUCCESS,
      payload: {
        user: {
          ...userData,
          ...response.data
        }
      }
    });
  })
  .catch(() => {
    dispatch({
      type: types.REGISTER_FAILURE,
      payload: {
        user: {
          status_message: 'The user cannot be registered'
        }
      }
    });
  });
}

export const clearRegisterAction = () => {
  return {
    type: types.CLEAR_REGISTER
  }
}