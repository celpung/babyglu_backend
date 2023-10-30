module.exports = (sequelize, DataTypes) => {
  const PosyanduReport = sequelize.define(
    "PosyanduReport",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      time: {
        type: DataTypes.STRING,
      },
      detail: {
        type: DataTypes.TEXT,
      },
      image: {
        type: DataTypes.STRING,
      },
      posyandu_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "posyandus",
          },
          key: 'id'
        },
      },
    }, { tableName: "posyandu_reports", }
  );

  PosyanduReport.associate = (models) => {
    PosyanduReport.belongsTo(models.Posyandu, {
      foreignKey: "posyandu_id",
      as: "posyandu",
    });
  }

  return PosyanduReport;
};
