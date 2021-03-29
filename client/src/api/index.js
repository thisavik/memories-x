const axios = require('axios');

const url = process.env.REACT_APP_URL;

export const fetchPosts = async () => {
  try {
    const res = await axios.get(url);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "unable to fetch data :("};
  }
}

export const createPost = async (newPost) => {
  try {
    const res = await axios.post(url, newPost);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
};

export const updatedPost = async (id, updatedPost) => {
  try {
    const res = await axios.patch(`${url}/${id}`, updatedPost);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
}

export const deletePost = async (id) => {
  try {
    await axios.delete(`${url}/${id}`);
  } catch (err) {
    console.log(err);
    return { "message": "Something goes wrong." };
  }
}

export const likePost = async (id) => {
  try {
    const res = await axios.patch(`${url}/${id}/likePost`);
    return res;
  } catch (err) {
    console.log(err);
    return { "message": "Invalid Post!! :(" };
  }
}