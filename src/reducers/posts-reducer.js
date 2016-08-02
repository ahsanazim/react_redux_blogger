import { ActionTypes } from '../actions';

const PostsReducer = (state = { all: [], post: null }, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      console.log('in action creator FETCH_POSTS');
      console.log(action.payload.posts);
      return { ...state, all: action.payload.posts };
    case ActionTypes.FETCH_POST:
      console.log('in action creator FETCH_POST');
      console.log(action.payload.post);
      return { ...state, post: action.payload.post };
    // case ActionTypes.CREATE_POST:
    //   return state;
    // case ActionTypes.UPDATE_POST:
    //   return state;
    // case ActionTypes.DELETE_POST:
    //   return state;
    default:
      return state;
  }
};

export default PostsReducer;
