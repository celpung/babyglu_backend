module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nik: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      province: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      district: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      village: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      photos: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "inactive",
      },
      level: {
        type: DataTypes.STRING,
        defaultValue: "user",
      },
      birthDay: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      motherName: {
        type: DataTypes.STRING
      },
      job: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      income: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    }, { tableName: "users", }
  );

  User.associate = (models) => {
    User.hasMany(models.Children, {
      foreignKey: "user_id",
      as: "children",
    });
    User.hasOne(models.Kader, {
      foreignKey: "user_id",
      as: "kader",
    });
  }

  return User;
};
