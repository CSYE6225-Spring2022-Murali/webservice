const AWS = require("aws-sdk");
require("dotenv").config();


AWS.config.region = "us-east-1";
AWS.config.credentials = new AWS.EC2MetadataCredentials({
    httpOptions: { timeout: 5000 },
    maxRetries: 10,
    retryDelayOptions: { base: 200 },
});

const awsConfig = {
    "region" : "us-east-1",
    "accessKeyId" : process.env.AWS_ACCESS_KEY_ID,
    "secretAccessKey" : process.env.AWS_SECRET_ACCESS_KEY
}

AWS.config.update(awsConfig);

const dynamoDBClient = new AWS.DynamoDB({
    // credentials: AWS.config.credentials,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "us-east-1",
});

const dynamo = {};
dynamo.dynamoDBClient = dynamoDBClient;

module.exports = dynamo;
