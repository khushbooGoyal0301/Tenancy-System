

const path  = require('path');
require('dotenv').config({
    path: path.join(__dirname, '../.env')
  });
 
  export const config = {
    env: process.env.ENVIRONMENT,
    port: +process.env.PORT,
    logAccessKeyId: process.env.ACCESS_TOKEN_SECRET,
    logSecretAccessKey: process.env.REFRESH_TOKEN_SECRET
  };