// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('usuario', [
      {
        usuario: 'admin',
        contrasena: '672caf27f5363dc833bda5099775e891',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_persona: 1,
      },
      {
        usuario: 'rrivero',
        contrasena: 'c32df4cbe60a1638e73e5b29bfaefffe',
        _usuario_creacion: '1',
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
        fid_persona: 2,
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
