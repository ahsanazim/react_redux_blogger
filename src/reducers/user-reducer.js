import { ActionTypes } from '../actions';

const UserReducer = (state = { username: '', email: '', numPosts: 0 }, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, username: action.username, email: action.email, numPosts: action.numPosts };
    case ActionTypes.UNSET_USER:
      return { ...state, username: '', email: '', numPosts: 0 };
    default:
      return state;
  }
};

export default UserReducer;
