const validate = require('express-validation');
const paramValidation = require('./autenticacion.validation');

module.exports = (app) => {
  app.post('/autenticar', validate(paramValidation.login), app.controller.autenticacion.post);

  // express-validation
  app.use((err, req, res, next) => {
    res.status(400).json(err);
  });
};
