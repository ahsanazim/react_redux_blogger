import { ActionTypes } from '../actions';

const PostsReducer = (state = { all: [], post: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload.posts };
    case ActionTypes.FETCH_POST:
      return { ...state, post: action.payload.post };
    default:
      return state;
  }
};

export default PostsReducer;
