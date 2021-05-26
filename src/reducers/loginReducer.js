import { types } from '../actions/userActions';

const INITIAL_STATE = {
  token: {},
  session: {},
  loading: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.REQUEST_TOKEN_REQUEST:
    case types.CREATE_SESSION_REQUEST:
      return { ...state, loading: true, error: false };
    
    case types.REQUEST_TOKEN_SUCCESS:
      return { ...state, token: action.payload.token, loading: false, error: false };
    
    case types.CREATE_SESSION_SUCCESS:
      return { ...state, session: action.payload.session, loading: false, error: false };
    
    case types.REQUEST_TOKEN_FAILUE:
      return { ...state, token: action.payload.token, loading: false, error: true };
    
    case types.CREATE_SESSION_FAILURE:
      return { ...state, session: action.payload.session, loading: false, error: true };

    case types.CLOSE_SESSION:
      return INITIAL_STATE;
    
    default:
      return state;
  }
}