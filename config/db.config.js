module.exports = {
    // HOST: "localhost",
    // USER: "root",
    // PASSWORD: "muraliroot",
    // DB: "test_db",
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