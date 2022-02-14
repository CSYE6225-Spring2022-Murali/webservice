module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "users",
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        writeOnly: true,
      },
    },
    {
      createdAt: "account_created",
      updatedAt: "account_updated",
    }
  );
  return Users;
};