/**
 * Módulo que mapea subcategorias existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const subcategoria = sequelize.define('subcategoria', {
      id_subcategoria: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id subcategoria ',
        autoIncrement: true,
      },
      nombre: {
        type: DataType.STRING(200),
        field: 'nombre',
        xlabel: 'nombre',
        allowNull: false,
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
        tableName: 'subcategoria',
      },
    });
  
    subcategoria.beforeCreate((subcategoria, options) => {
  
    });
  
    subcategoria.beforeUpdate((subcategoria, options) => {
  
    });
  
    return subcategoria;
  };
  