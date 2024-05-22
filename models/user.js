module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "tbl_user",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: true,
      },
      userid: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      nickname: {
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: true,
    }
  );

  return user;
};
