import axios from 'axios';

const request = (req) =>
  axios.create({
    baseURL: 'http://localhost:3333/',
    headers: {
      cookie: req.get('cookie') || '',
    },
  });

export default request;
