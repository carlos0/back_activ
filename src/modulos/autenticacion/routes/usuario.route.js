const validate = require('express-validation');
const paramValidation = require('./usuario.validation');

module.exports = (app) => {
  app.api.get('/usuario', app.controller.usuario.get);
  app.api.get('/usuario/:id', validate(paramValidation.getUsuarioId), app.controller.usuario.getId);
  app.api.post('/usuario', validate(paramValidation.createUsuario), app.controller.usuario.post);
  app.api.put('/usuario/:id', app.controller.usuario.put);
  app.api.delete('/usuario/:id', app.controller.usuario.delete);
};
