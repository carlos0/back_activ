// 'use strict';

module.exports = {
  up(queryInterface) {
      return queryInterface.bulkInsert('grupoC', [{
              nombre: 'MUEBLES Y ENSERES DE OFICINA',
              _usuario_creacion: '1',
              _fecha_creacion: new Date(),
              _fecha_modificacion: new Date(),
          },
          {
              nombre: 'EQUIPO DE COMUNICACIONES',
              _usuario_creacion: '1',
              _fecha_creacion: new Date(),
              _fecha_modificacion: new Date(),
          },
          {
              nombre: 'EQUIPO EDUCACIONAL Y RECREATIVO',
              _usuario_creacion: '1',
              _fecha_creacion: new Date(),
              _fecha_modificacion: new Date(),
          },
          {
              nombre: 'EQUIPO DE COMPUTACION',
              _usuario_creacion: '1',
              _fecha_creacion: new Date(),
              _fecha_modificacion: new Date(),
          },
          {
              nombre: 'EQUIPO E INSTALACIONES',
              _usuario_creacion: '1',
              _fecha_creacion: new Date(),
              _fecha_modificacion: new Date(),
          },
      ], {});
  },

  down() {
      /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};