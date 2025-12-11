'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('asesorias', 'espacio_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      after: 'carrera_id'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('asesorias', 'espacio_id');
  }
};
