import axios from 'axios';
import { browserHistory } from 'react-router';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SET_ERROR: 'SET_ERROR',
  UNSET_ERROR: 'UNSET_ERROR',
  SET_USER: 'SET_USER',
  UNSET_USER: 'UNSET_USER',
};

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://bloggrupgraded.herokuapp.com/api';

// ACTION CREATORS ============================================================>

// error with message
export function reportError(error) {
  return ({
    type: ActionTypes.SET_ERROR,
    message: error,
  });
}

// no error, message set to '' in reducer
export function removeError() {
  return ({
    type: ActionTypes.UNSET_ERROR,
  });
}

// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// User Action Creators

export function setUserProfile(username, email, numPosts) {
  return {
    type: ActionTypes.SET_USER,
    username,
    email,
    numPosts,
  };
}

export function unsetUserProfile() {
  return {
    type: ActionTypes.UNSET_USER,
  };
}

// dispatch functions with thunk middleware

// POSTS ======================================================================>

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(reportError(`Fetching posts failed (${error.message})`));
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
    .then(response => {
      dispatch({ type: 'FETCH_POST', payload: { post: response.data } });
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(reportError(`Fetching post failed (${error.message})`));
    });
  };
}

function uploadImage(file, id) {
  axios.post(`${ROOT_URL}/images`, { filename: file.name, filetype: file.type, id })
  .then(response => {
    const signedUrl = response.data.requestUrl;

    const options = {
      headers: {
        'Content-Type': file.type,
      },
    };
    axios.put(signedUrl, file, options).then(() => {
      console.log('Success uploading image');
    }).catch(error => {
      console.log(error);
    });
  }).catch(error => {
    console.log(error);
  });
}

// note: props = post
export function createPost(props, file) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, props, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      if (file) {
        uploadImage(file, response.data._id);
      }
      dispatch(removeError());
      browserHistory.push('/');
    })
    .catch(error => {
      dispatch(reportError(`Create failed (${error.message})`));
    });
  };
}

export function updatePost(id, post, file) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      if (file) {
        uploadImage(file, response.data._id);
      }
      dispatch(fetchPost(id));
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(reportError(`Update failed (${error.message})`));
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch(removeError());
      browserHistory.push('/');
    })
    .catch(error => {
      dispatch(reportError(`Deletion failed (${error.message})`));
    });
  };
}

// USER AUTH ==================================================================>

// takes in an object with email and password (minimal user object)
// returns a thunk method that takes dispatch as an argument (just like our create post method really)
// does an axios.post on the /signin endpoint
// on success does:
//  dispatch({ type: ActionTypes.AUTH_USER });
//  localStorage.setItem('token', response.data.token);
// on error should dispatch(authError(`Sign In Failed: ${error.response.data}`));
export function signinUser({ email, password, username }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password, username })
    .then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      dispatch(setUserProfile(username, '', 0));
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
      dispatch(reportError(`Sign In Failed: ${error.response.data}`));
    });
  };
}

// takes in an object with email and password (minimal user object)
// returns a thunk method that takes dispatch as an argument (just like our create post method really)
// does an axios.post on the /signup endpoint (only difference from above)
// on success does:
//  dispatch({ type: ActionTypes.AUTH_USER });
//  localStorage.setItem('token', response.data.token);
// on error should dispatch(authError(`Sign Up Failed: ${error.response.data}`));
export function signupUser({ email, password, username }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { email, password, username })
    .then(response => {
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      dispatch(setUserProfile(username, '', 0));
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
      dispatch(reportError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    dispatch(unsetUserProfile());
    browserHistory.push('/');
  };
}

// USER PROFILE ===============================================================>

export function getUserProfile(username) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${username}`)
    .then(response => {
      dispatch(setUserProfile(response.data.username, response.data.email, response.data.numPosts));
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(reportError(`getting profile Failed: ${error.response.data}`));
    });
  };
}

// SEARCH =====================================================================>

export function searchPosts(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/search/${query}`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
      dispatch(removeError());
    })
    .catch(error => {
      dispatch(reportError(`Search failed (${error.message})`));
    });
  };
}
