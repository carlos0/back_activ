// 'use strict';

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('parametro', [
      // Tipos de Documentos de identidad
      {
        id_parametro: 1,
        sigla: 'LPZ',
        nombre: 'LA PAZ',
        descripcion: '',
        orden: 1,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 2,
        sigla: 'SCZ',
        nombre: 'SANTA CRUZ',
        descripcion: '',
        orden: 2,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 3,
        sigla: 'CBA',
        nombre: 'COCHABAMBA',
        descripcion: '',
        orden: 3,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 4,
        sigla: 'CHA',
        nombre: 'CHUQUISACA',
        descripcion: '',
        orden: 4,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 5,
        sigla: 'ORU',
        nombre: 'ORURO',
        descripcion: '',
        orden: 5,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 6,
        sigla: 'PTS',
        nombre: 'POTOSI',
        descripcion: '',
        orden: 6,
        grupo: 'REGIONAL',
        estado: 'ACTIVO',
        _usuario_creacion: 1,
        _fecha_creacion: new Date(),
        _fecha_modificacion: new Date(),
      },
      {
        id_parametro: 7,
        sigla: 'TJA',
        nombre: 'TARIJA',
        descripcion: '',
        orden: 7,
        grupo: 'REGIONAL',
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
