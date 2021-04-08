const axios = require('axios');

const api = axios.create({ baseURL: process.env.REACT_APP_URL });

// api middleware
api.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchPosts = async () => {
  try {
    const res = await api.get(`/posts`);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "unable to fetch data :("};
  }
}

export const createPost = async (newPost) => {
  try {
    const res = await api.post(`/posts`, newPost);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
};

export const updatedPost = async (id, updatedPost) => {
  try {
    const res = await api.patch(`/posts/${id}`, updatedPost);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
}

export const deletePost = async (id) => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (err) {
    console.log(err);
    return { "message": "Something goes wrong." };
  }
}

export const likePost = async (id) => {
  try {
    const res = await api.patch(`/posts/${id}/likePost`);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
}

export const signin = async (formData) => {
  try {
    const res = await api.post(`/user/signin`, formData);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export const signup = async (formData) => {
  try {
    const res = await api.post(`/user/signup`, formData);
    return res;
  } catch (err) {
    console.log(err);
  }
}