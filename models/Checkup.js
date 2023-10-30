module.exports = (sequelize, DataTypes) => {
  const Checkup = sequelize.define(
    'Checkup',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tall: {
        type: DataTypes.FLOAT,
      },
      weight: {
        type: DataTypes.FLOAT,
      },
      headCircumference: {
        type: DataTypes.FLOAT,
      },
      armCircumference: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
      children_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'childrens',
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
      vaccination_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: 'vaccinations',
          },
          key: 'id',
        },
      },
      status: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    { tableName: 'checkups' },
  );

  Checkup.associate = (models) => {
    Checkup.belongsTo(models.Posyandu, {
      foreignKey: 'posyandu_id',
      as: 'posyandu',
    });

    Checkup.belongsTo(models.Children, {
      foreignKey: 'children_id',
      as: 'children',
    });

    Checkup.belongsTo(models.Kader, {
      foreignKey: 'kader_id',
      as: 'kader',
    });

    Checkup.belongsTo(models.Vaccination, {
      foreignKey: 'vaccination_id',
      as: 'vaccination',
    });

    Checkup.hasMany(models.AksiPenanganan, {
      foreignKey: 'checkup_id',
      as: 'aksi_penanganan',
    });
  };

  return Checkup;
};
