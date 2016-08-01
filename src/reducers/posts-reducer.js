import { ActionTypes } from '../actions';

const PostsReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return state.posts.all;
    case ActionTypes.FETCH_POST:
      return state.posts.all[action.id];
    case ActionTypes.CREATE_POST:
      return state.posts.all;
    case ActionTypes.UPDATE_POST:
      return state.posts.all;
    case ActionTypes.DELETE_POST:
      return state.posts.all;
    default:
      return state;
  }
};

export default PostsReducer;
