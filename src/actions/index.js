// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
};


export function fetchPosts() {
  return {
    type: ActionTypes.FETCH_POSTS,
    payload: null,
  };
}

export function fetchPost() {
  return {
    type: ActionTypes.FETCH_POST,
    payload: null,
  };
}

export function createPost() {
  return {
    type: ActionTypes.CREATE_POST,
    payload: null,
  };
}

export function updatePost() {
  return {
    type: ActionTypes.UPDATE_POST,
    payload: null,
  };
}

export function deletePost() {
  return {
    type: ActionTypes.DELETE_POST,
    payload: null,
  };
}
