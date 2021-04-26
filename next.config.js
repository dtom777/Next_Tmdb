require('dotenv').config();
module.exports = {
  images: {
    domains: ['image.tmdb.org'],
  },
  env: {
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
};
