const Joi = require('../../../lib/joi');

module.exports = {
  getUsuarioId: {
    params: {
      id: Joi.number().required(),
    },
  },
  createUsuario: {
    body: {
      nombres: Joi.string().required(),
      primer_apellido: Joi.string().min(2).max(25).required(),
      segundo_apellido: Joi.string().min(2).max(25).required(),
      documento_identidad: Joi.required(),
      fecha_nacimiento: Joi.date().required(),
      email: Joi.string().email(),
      usuario: Joi.string().required(),
      contrasena: Joi.string().required(),
      roles: Joi.array().min(1).required(),
    },
  },
  updateUsuario: {
    body: {
      nombres: Joi.string().required(),
      primer_apellido: Joi.string().min(2).max(25).required(),
      segundo_apellido: Joi.string().min(2).max(25).required(),
      documento_identidad: Joi.required(),
      fecha_nacimiento: Joi.date().required(),
      email: Joi.string().email(),
      usuario: Joi.string().required(),
      roles: Joi.array().min(1).required(),
    },
    params: {
      id: Joi.number().required(),
    },
  },
  deleteUsuario: {
    params: {
      id: Joi.number().required(),
    },
  },
};
