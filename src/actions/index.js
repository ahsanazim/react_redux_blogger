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
      console.log('FETCHEDDDDDDDDDDDDD');
      console.log(response.data);
    })
    .catch(error => {
      console.log('error in fetchPost()');
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

export function updatePost(id, post) {
  return (dispatch) => {
    const updatedPost = { title: post.title, tags: post.tags, content: post.content };
    console.log(updatedPost);
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, updatedPost)
    .then(response => {
      console.log('in updating then clause');
      console.log(`url accessed during update: ${ROOT_URL}/posts/${id}${API_KEY}, ${response.data}`);
      console.log('going from update to fetch');
      dispatch(fetchPost(id));
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
