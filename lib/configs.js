module.exports = {
  WEB_SERVER: {
    PORT: process.env.PORT || 6060,
    ENV: process.env.NODE_ENV || 'development',
    ORIGIN: process.env.NODE_ENV === 'production' ? process.env.API_ORIGIN : 'http://localhost:6060',
  },
  CLIENT: {
    URL_ORIGIN: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_DOMAIN.split(',') : 'http://localhost:3000',
    WRLD: {
      INDEX: process.env.NODE_ENV === 'production' ? process.env.WRLD_URL_INDEX : 'https://anzworldline.com.au/content/dam/anzworldline/instore-offer/index.html',
      WRLD_SUCCESS: process.env.NODE_ENV === 'production' ? process.env.WRLD_URL_SUCCESS : 'https://anzworldline.com.au/content/dam/anzworldline/instore-offer/success.html',
      WRLD_FAIL: process.env.NODE_ENV === 'production' ? process.env.WRLD_URL_FAIL : 'https://anzworldline.com.au/content/dam/anzworldline/instore-offer/fail.html',
    },
  },
  CORS: {
    ALLOWED: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_DOMAIN.split(',') : 'http://localhost:3000',
  },
  META: {
    API_VERSION: process.env.API_VERSION,
  },
  DATABASE: {
    URI: process.env.MONGO_URI,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
  },
};
