import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer.js';
import PostsReducer from './posts-reducer.js';
import ErrorReducer from './error-reducer.js';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
});

export default rootReducer;
