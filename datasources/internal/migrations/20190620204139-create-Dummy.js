module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'Dummy',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        freezeTableName: true
      }
    );
  },
  down: queryInterface => {
    return queryInterface.dropTable('Dummy');
  }
};
