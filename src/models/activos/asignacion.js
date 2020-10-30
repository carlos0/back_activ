/**
 * Módulo que mapea los cargo existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const asignacion = sequelize.define('asignacion', {
      id_asignacion: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id asignacion ',
        autoIncrement: true,
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
          asignacion.belongsTo(models.funcionario, { as: 'funcionario', foreignKey: { name: 'fid_funcionario', targetKey: 'id_funcionario', allowNull: false, xlabel: 'funcionario' } });
          asignacion.belongsTo(models.activo, { as: 'activo', foreignKey: { name: 'fid_activo', targetKey: 'id_activo', allowNull: false, xlabel: 'activo' } });
        },
        tableName: 'asignacion',
      },
    });
  
    asignacion.beforeCreate((asignacion, options) => {
  
    });
  
    asignacion.beforeUpdate((asignacion, options) => {
  
    });
  
    return asignacion;
  };
  