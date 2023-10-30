module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'Schedule',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      posyandu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'posyandus',
          },
          key: 'id',
        },
      },
      kader_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'kaders',
          },
          key: 'id',
        },
      },
      schedule: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'schedules' },
  );

  Schedule.associate = (models) => {
    Schedule.belongsTo(models.Posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });
    Schedule.belongsTo(models.Kader, {
      foreignKey: 'kader_id',
      as: 'kader',
    });
  };

  return Schedule;
};
