import axios from 'axios';
import { browserHistory } from 'react-router';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

// const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const ROOT_URL = 'https://bloggredux.herokuapp.com/api';
// const API_KEY = '?key=a_azim';

export function fetchPosts() {
  return (dispatch) => {
    // axios.get(`${ROOT_URL}/posts${API_KEY}`)
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
    // axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
    axios.get(`${ROOT_URL}/posts/${id}`)
    .then(response => {
      dispatch({ type: 'FETCH_POST', payload: { post: response.data } });
    })
    .catch(error => {
      console.log(error);
    });
  };
}

export function createPost(props) {
  return (dispatch) => {
    // axios.post(`${ROOT_URL}/posts/${API_KEY}`, props)
    axios.post(`${ROOT_URL}/posts`, props)
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
    // axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, post)
    axios.put(`${ROOT_URL}/posts/${id}`, post)
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
    // axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    axios.delete(`${ROOT_URL}/posts/${id}`)
    .then(response => {
      browserHistory.push('/');
    })
    .catch(error => {
      console.log(error);
    });
  };
}
