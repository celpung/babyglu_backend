module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autiIncrement: true,
      },
      title: {
        type: DataTypes.STRING
      },
      post: {
        type: DataTypes.TEXT
      },
      forUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      forKader: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: 'id'
        },
      },
    }, { tableName: "notifications", }
  );
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  }
  return Notification;
};