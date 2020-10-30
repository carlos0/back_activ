/**
 * Módulo que mapea los cargos existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const historial = sequelize.define('historial', {
      id_historial: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id historial ',
        autoIncrement: true,
      },
      id_activo: {
        type: DataType.INTEGER,
        field: 'id_activo',
        xlabel: 'id_activo',
        allowNull: false,
      },
      nombre: {
        type: DataType.STRING(200),
        field: 'nombre',
        xlabel: 'nombre',
        allowNull: false,
      },
      fecha: {
        type: DataType.DATE,
        field: 'fecha',
        xlabel: 'fecha',
        allowNull: false,
      },
      id_funcionario: {
        type: DataType.INTEGER,
        field: 'id_funcionario',
        xlabel: 'id_funcionario',
        allowNull: false,
      },
      observaciones: {
        type: DataType.STRING(200),
        field: 'observaciones',
        xlabel: 'observaciones',
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
      createdAt: '_fecha_creacion',
      updatedAt: '_fecha_modificacion',
      classMethods: {
        associate: (models) => {
        },
        tableName: 'historial',
      },
    });
  
    historial.beforeCreate((historial, options) => {
  
    });
  
    historial.beforeUpdate((historial, options) => {
  
    });
  
    return historial;
  };
