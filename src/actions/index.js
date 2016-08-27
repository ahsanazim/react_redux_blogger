import axios from 'axios';
import { browserHistory } from 'react-router';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
};

// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'http://bloggrupgraded.herokuapp.com/api';

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}`)
    .then(response => {
      dispatch({ type: 'FETCH_POST', payload: { post: response.data } });
    })
    .catch(error => {
      console.log(error);
    });
  };
}

// note: props = post
export function createPost(props) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, props, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      browserHistory.push('/');
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function updatePost(id, post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}`, post, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      dispatch(fetchPost(id));
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}`, { headers: { authorization: localStorage.getItem('token') } })
    .then(response => {
      browserHistory.push('/');
    })
    .catch(error => {
      console.log(error);
    });
  };
}

// trigger to deauth if there is error
// can also use in your error reducer if you have one to display an error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

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
    })
    .catch(error => {
      dispatch(authError(`Sign In Failed: ${error.response.data}`));
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
    })
    .catch(error => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}


// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    browserHistory.push('/');
  };
}

export function searchPosts(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/search/${query}`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
    })
    .catch(error => {
      console.log(error);
    });
  };
}
