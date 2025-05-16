const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    server: {
        PORT: process.env.PORT || 5000
    },
 mongoDB: {
    database: process.env.MONGODB_DATABASE,
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
  },
}