import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer.js';
import PostsReducer from './posts-reducer.js';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
});

export default rootReducer;
