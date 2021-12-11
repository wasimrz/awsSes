// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

// Load the env variables
require("dotenv").config({ path: __dirname + "/.env" });

// Set region
AWS.config.update({ region: process.env.AWS_REGION });

// export the AWS object to be used at other places

module.exports = { AWS };
