import axios from 'axios';
import { browserHistory } from 'react-router';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // CREATE_POST: 'CREATE_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // DELETE_POST: 'DELETE_POST',
};

const ROOT_URL = 'https://cs52-blog.herokuapp.com/api';
const API_KEY = '?key=a_azim';

export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`)
    .then(response => {
      dispatch({ type: 'FETCH_POSTS', payload: { posts: response.data } });
    })
    .catch(error => {

    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(response => {
      dispatch({ type: 'FETCH_POST', payload: { post: response.data } });
    })
    .catch(error => {

    });
  };
}

export function createPost(props) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts/${API_KEY}`, props)
    .then(response => {
      browserHistory.push('/');
    })
    .catch(error => {

    });
  };
}

export function updatePost(post) {
  return (dispatch) => {
    const updatedPost = { title: post.title, tags: post.tags, content: post.content };

    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, updatedPost)
    .then(response => {


    })
    .catch(error => {

    });
  };
}

export function deletePost(id) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(response => {
      browserHistory.push('/');
    })
    .catch(error => {

    });
  };
}
