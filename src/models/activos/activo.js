/**
 * Módulo que mapea los cargos existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
  const activo = sequelize.define('activo', {
    id_activo: {
      type: DataType.INTEGER,
      primaryKey: true,
      xlabel: 'Id activo ',
      autoIncrement: true,
    },
    nombre: {
      type: DataType.STRING(200),
      field: 'nombre',
      xlabel: 'nombre',
      allowNull: false,
    },
    codigo: {
      type: DataType.STRING(100),
      field: 'codigo',
      xlabel: 'codigo',
      allowNull: false,
    },
    oficina: {
      type: DataType.STRING(200),
      field: 'oficina',
      xlabel: 'oficina',
      allowNull: true,
    },
    _usuario_creacion: {
      type: DataType.STRING(50),
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.STRING(50),
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
      allowNull: true,
    },
  }, {
    createdAt: 'fec_registro',
    updatedAt: 'fec_modificacion',
    classMethods: {
      associate: (models) => {
      },
      tableName: 'activo',
    },
  });

  activo.beforeCreate((activo, options) => {

  });

  activo.beforeUpdate((activo, options) => {

  });

  return activo;
};
