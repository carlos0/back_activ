/**
 * Módulo que mapea categorias existentes
 *
 * @module
 *
 * */

module.exports = (sequelize, DataType) => {
    const categoria = sequelize.define('categoria', {
      id_categoria: {
        type: DataType.INTEGER,
        primaryKey: true,
        xlabel: 'Id categoria ',
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
          categoria.belongsTo(models.subcategoria, { as: 'subcategoria', foreignKey: { name: 'fid_subcategoria', targetKey: 'id_subcategoria', allowNull: false, xlabel: 'subcategoria' } });
        },
        tableName: 'categoria',
      },
    });
  
    categoria.beforeCreate((categoria, options) => {
  
    });
  
    categoria.beforeUpdate((categoria, options) => {
  
    });
  
    return categoria;
  };
  