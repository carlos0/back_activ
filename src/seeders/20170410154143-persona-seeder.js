// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('persona', [{
      documento_identidad: '6951939',
      nombres: 'Carlos',
      primer_apellido: 'Macuchapi',
      segundo_apellido: 'Parisaca',
      estado: 'ACTIVO',
      _usuario_creacion: 1,
      _fecha_creacion: new Date(),
      _fecha_modificacion: new Date(),
    },
    //2
    {
      documento_identidad: '0000002',
      nombres: 'Rafael',
      primer_apellido: 'Rios',
      estado: 'ACTIVO',
      _usuario_creacion: 1,
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
