import { ActionTypes } from '../actions';

const ErrorReducer = (state = { isError: false, errorMsg: '' }, action) => {
  switch (action.type) {
    case ActionTypes.SET_ERROR:
      return { ...state, isError: true, errorMsg: action.message };
    case ActionTypes.UNSET_ERROR:
      return { ...state, isError: false, errorMsg: '' };
    default:
      return state;
  }
};

export default ErrorReducer;
