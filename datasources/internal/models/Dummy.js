module.exports = (sequelize, DataTypes) => {
  const Dummy = sequelize.define(
    'Dummy',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: 3,
          isAlpha: true
        }
      },
      description: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      timestamps: true,
      freezeTableName: true
    }
  );
  return Dummy;
};
