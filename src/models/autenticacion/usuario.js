/* *
 * Módulo par usuario
 *
 * @module
 *
 * */
const crypto = require('crypto');


module.exports = (sequelize, DataType) => {
  const usuario = sequelize.define('usuario', {
    id_usuario: {
      type: DataType.INTEGER,
      field: 'id_usuario',
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'ID',
    },
    usuario: {
      type: DataType.STRING(100),
      field: 'usuario',
      xlabel: 'Nombre de usuario',
      allowNull: false,
      unique: true,
      validate: {
        len: { args: [3, 100], msg: 'El campo \'Nombre de Usuario\' permite un mínimo de 3 caracteres y un máximo de 100 caracteres' },
      },
    },
    cargo: {
      type: DataType.STRING(200),
      field: 'cargo',
      xlabel: 'Nombre de cargo',
      allowNull: false,
    },
    contrasena: {
      type: DataType.STRING,
      field: 'contrasena',
      xlabel: 'Contraseña',
      allowNull: false,
      defaultValue: '',
    },
    observaciones: {
      type: DataType.STRING(100),
      field: 'observaciones',
      xlabel: 'Observaciones',
      validate: {
        len: { args: [0, 100], msg: 'El campo \'Observaciones\' permite un máximo de 100 caracteres' },
      },
    },
    estado: {
      type: DataType.STRING(30),
      field: 'estado',
      xlabel: 'Estado',
      allowNull: false,
      defaultValue: 'ACTIVO',
      validate: {
        isIn: {
          args: [['ACTIVO', 'ELIMINADO']],
          msg: 'El campo estado sólo permite valores: ACTIVO o ELIMINADO.',
        },
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
      // Creando asociaciones para la entidad
      associate: (models) => {
        usuario.belongsTo(models.persona, { as: 'persona', foreignKey: { name: 'fid_persona', targetKey: 'id_persona', allowNull: false, xchoice: 'nombres', xlabel: 'Nombres' } });
      },
      tableName: 'usuario',
      buscarIncluye: (Persona) => usuario.findAndCountAll({
        attributes: ['id_usuario', 'usuario', 'cargo', 'observaciones'],
        distinct: true,
        include: [{
          model: Persona,
          as: 'persona',
          attributes: ['documento_identidad', 'nombres', 'primer_apellido', 'segundo_apellido'],
          required: true,
        },
        ],
      }),
      buscarIncluyeOne: (id, Persona) => usuario.findOne({
        attributes: ['id_usuario', 'usuario', 'cargo', 'estado', 'observaciones'],
        where: {
          id_usuario: id,
        },
        include: [{
          model: Persona,
          as: 'persona',
          attributes: ['documento_identidad', 'nombres', 'primer_apellido', 'segundo_apellido'],
        }],
      }),
    },
  });

  // Hash password usuario MD5 para eventos de actualizacion y creacion
  const hashPasswordHook = (instance) => {
    if (!instance.changed('contrasena')) return false;
    const contrasena = instance.get('contrasena');
    const password = crypto.createHash('md5').update(contrasena).digest('hex');
    instance.set('contrasena', password);
  };
  usuario.beforeCreate((usuario, options) => {
    hashPasswordHook(usuario);
    usuario.usuario = usuario.usuario.toLowerCase();
  });

  usuario.beforeUpdate(hashPasswordHook);
  return usuario;
};
