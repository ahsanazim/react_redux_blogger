import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer.js';
import PostsReducer from './posts-reducer.js';
import ErrorReducer from './error-reducer.js';
import UserReducer from './user-reducer.js';
import TagsReducer from './tags-reducer.js';

const rootReducer = combineReducers({
  posts: PostsReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  user: UserReducer,
  tags: TagsReducer,
});

export default rootReducer;
