/**
 * Módulo que mapea las PERSONAS existentes, cada persona sólo debería estar
 * registrada una vez en esta tabla.
 *
 * @module
 *
 */

module.exports = (sequelize, DataType) => {
  const persona = sequelize.define('persona', {
    id_persona: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      xlabel: 'Id de la persona',
    },
    documento_identidad: {
      type: DataType.STRING(25),
      field: 'documento_identidad',
      xlabel: 'Documento de identidad',
      allowNull: false,
      validate: {
        len: { args: [5, 25], msg: 'El campo \'Documento de identidad\' permite un mínimo de 5 caracter y un máximo de 25 caracteres' },
        is: { args: /^[0-9|A-Z|-|-|.]+$/i, msg: 'El campo \'Documento de identidad\' permite sólo letras, números, guiones y puntos.' },
      },
    },
    nombres: {
      type: DataType.STRING(100),
      field: 'nombres',
      xlabel: 'Nombres',
      allowNull: false,
      validate: {
        len: { args: [1, 100], msg: 'El campo \'Nombres\' permite un mínimo de 1 caracter y un máximo de 100 caracteres' },
        is: { args: /^[A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]+$/i, msg: 'El campo \'Nombres\' permite sólo letras' },
      },
    },
    primer_apellido: {
      type: DataType.STRING(100),
      field: 'primer_apellido',
      xlabel: 'Primer apellido',
      allowNull: true,
      validate: {
        len: { args: [0, 100], msg: 'El campo \'Primer apellido\' permite un mínimo de 1 caracter y un máximo de 100 caracteres' },
        is: { args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: 'El campo \'Primer apellido\' permite sólo letras' },
      },
    },
    segundo_apellido: {
      type: DataType.STRING(100),
      field: 'segundo_apellido',
      xlabel: 'Segundo apellido',
      allowNull: true,
      validate: {
        len: { args: [0, 100], msg: 'El campo \'Segundo apellido\' permite un máximo de 100 caracteres' },
        is: { args: /^([A-Z|Á|É|Í|Ó|Ú|À|È|Ì|Ò|Ù|Ä|Ë|Ï|Ö|Ü|Â|Ê|Î|Ô|Û|Ñ|'|´| ]|)+$/i, msg: 'El campo \'Segundo apellido\' permite solo letras' },
      },
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
      type: DataType.INTEGER,
      field: '_usuario_creacion',
      xlabel: 'Usuario de creación',
      allowNull: false,
    },
    _usuario_modificacion: {
      type: DataType.INTEGER,
      field: '_usuario_modificacion',
      xlabel: 'Usuario de modificación',
    },
  }, {
    createdAt: '_fecha_creacion',
    updatedAt: '_fecha_modificacion',
    classMethods: {
      // Creando asociaciones para la entidad
    },
    tableName: 'persona',
  });

  return persona;
};
