import { ActionTypes } from '../actions';

const TagsReducer = (state = { tags: [] }, action) => {
  switch (action.type) {
    case ActionTypes.SET_TAGS:
      return { ...state, tagsList: action.tags };
    default:
      return state;
  }
};

export default TagsReducer;
