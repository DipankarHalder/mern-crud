const http = require('http');
const config = require('./config');
const app = require('./app');

http
  .createServer(app)
  .listen(config.PORT, () => console.log(`1. Server is running on port ${config.PORT}`));
