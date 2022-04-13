require("dotenv").config();

module.exports = {
    // HOST: "localhost",
    // USER: "root",
    // PASSWORD: "muraliroot",
    // DB: "test_db",
    // AWS_ACCESS_KEY_ID: "AKIA57NEYHZE3M2NNE2Q",
    // AWS_SECRET_ACCESS_KEY: "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",
    // PORT: "5001",
    // NODE_ENV: "DEVELOPMENT",
    // REGION: "us-east-1",
    // BUCKET_NAME: "lambda.prod.muralikrishna.me",
    // MYSQL_PORT: "3306",
    DYNAMODBTABLENAME: "TokenTable",
    SNSTOPICARN: "arn:aws:sns:us-east-1:960807583305:UserVerificationTopic",
    HOST: `${process.env.HOST}`,
    USER: `${process.env.USER}`,
    PASSWORD: `${process.env.PASSWORD}`,
    DB: `${process.env.DB}`,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
};