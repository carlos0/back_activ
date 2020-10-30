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
    sn: {
      type: DataType.STRING(100),
      field: 'sn',
      xlabel: 'sn',
      allowNull: true,
    },
    serial: {
      type: DataType.STRING(100),
      field: 'serial',
      xlabel: 'serial',
      allowNull: true,
    },
    oficina: {
      type: DataType.STRING(200),
      field: 'oficina',
      xlabel: 'oficina',
      allowNull: true,
    },
    imagen: {
      type: DataType.STRING(200),
      field: 'imagen',
      xlabel: 'imagen',
      allowNull: true,
    },
    observaciones: {
      type: DataType.STRING(200),
      field: 'observaciones',
      xlabel: 'observaciones',
      allowNull: true,
    },
    estado: {
      type: DataType.STRING(50),
      field: 'estado',
        xlabel: 'Estado',
        allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: { args: [['ACTIVO', 'INACTIVO', 'EN REPARACION', 'FUERA DE SERVICIO']], msg: 'El campo estado sólo permite valores: ACTIVO INACTIVO, EN REPARACION, FUERA DE SERVICIO.' },
      },
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
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
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
