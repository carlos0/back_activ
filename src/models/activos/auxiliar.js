/**
 * Módulo que mapea auxiliar existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const auxiliar = sequelize.define('auxiliar', {
      id_auxiliar: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id auxiliar',
        autoIncrement: true,
      },
      nombre: {
        type: DataType.STRING(200),
        field: 'nombre',
        xlabel: 'nombre',
        allowNull: false,
      },
      correlativo: {
        type: DataType.INTEGER,
        field: 'correlativo',
        xlabel: 'correlativo',
        allowNull: false,
        defaultValue: 0,
      },
      estado: {
        type: DataType.STRING(20),
        field: 'estado',
          xlabel: 'Estado',
          allowNull: false,
        defaultValue: 'ACTIVO',
        validate: {
          isIn: { args: [['ACTIVO', 'INACTIVO']], msg: 'El campo estado sólo permite valores: ACTIVO o INACTIVO.' },
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
        tableName: 'auxiliar',
      },
    });
  
    auxiliar.beforeCreate((auxiliar, options) => {
  
    });
  
    auxiliar.beforeUpdate((auxiliar, options) => {
  
    });
  
    return auxiliar;
  };
  