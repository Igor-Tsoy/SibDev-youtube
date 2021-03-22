import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  params: {
    part: 'snippet',
    key: process.env.VUE_APP_API_KEY,
    type: 'video'
  }
});

export default instance;
