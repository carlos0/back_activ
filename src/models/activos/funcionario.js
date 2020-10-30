/**
 * Módulo que mapea los funcionario existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const funcionario = sequelize.define('funcionario', {
      id_funcionario: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id funcionario ',
        autoIncrement: true,
      },
      nombres: {
        type: DataType.STRING(100),
        field: 'nombres',
        xlabel: 'nombres',
        allowNull: false,
      },
      apellidos: {
        type: DataType.STRING(100),
        field: 'apellidos',
        xlabel: 'apellidos',
        allowNull: false,
      },
      ci: {
        type: DataType.STRING(20),
        field: 'ci',
        xlabel: 'ci',
        allowNull: false,
      },
      cargo: {
        type: DataType.STRING(200),
        field: 'cargo',
        xlabel: 'cargo',
        allowNull: false,
      },
      observaciones: {
        type: DataType.STRING(200),
        field: 'observaciones',
        xlabel: 'observaciones',
        allowNull: true,
      },
      estado: {
        type: DataType.STRING(30),
        field: 'estado',
          xlabel: 'Estado',
          allowNull: false,
        defaultValue: 'ACTIVO',
        validate: {
          isIn: { args: [['ACTIVO', 'ELIMINADO']], msg: 'El campo estado sólo permite valores: ACTIVO o ELIMINADO.' },
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
        tableName: 'funcionario',
      },
    });
  
    funcionario.beforeCreate((funcionario, options) => {
  
    });
  
    funcionario.beforeUpdate((funcionario, options) => {
  
    });
  
    return funcionario;
  };
  