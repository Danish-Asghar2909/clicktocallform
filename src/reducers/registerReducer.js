import { types } from '../actions/userActions';

const INITIAL_STATE = {
  user: {},
  loading: false,
  error: false
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.REGISTER_REQUEST:
      return { ...state, loading: true, error: false };
    
    case types.REGISTER_SUCCESS:
      return { ...state, user: action.payload.user, loading: false, error: false };
    
    case types.REGISTER_FAILURE:
      return { ...state, user: action.payload.user, loading: false, error: true };

    case types.CLEAR_REGISTER:
      return INITIAL_STATE;
    
    default:
      return state;
  }
}