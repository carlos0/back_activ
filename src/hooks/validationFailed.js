"use strict";

const i18n = require('../lib/i18n');
const errors = require('../lib/errors');

function convertKey(message) {
  const arr = message.split(' ');
  arr.map(function (el, i) {
    if (i === 0) {
      arr[i] = el.toLowerCase();
    } else {
      arr[i] = el.substring(0, 1).toUpperCase() + el.substring(1);
    }
  });
  return arr.join('');
}

// Hook genérico para los errores de validación
function hook(sequelize) {
  sequelize.addHook('validationFailed', (instance, options, error, fn) => {
  let err = error.errors;
  let oError = {};
  for (let i in err) {
      let key = err[i].path;
      let type = err[i].type;
      let message = '';
      if (type == 'notNull Violation') {
          message = i18n.t('errors.validation.required');
      } else if (type == 'Validation error') {
          message = i18n.t(`errors.validation.${convertKey(err[i].message)}`) || err[i].message;
      } else {
          console.log('Error interno!!!!!!');
          throw new errors.InternalServerError(error.message);
      }
      if (oError[key]) {
          oError[key].err.push(message);
      } else {
          oError[key] = {
              "errors" : [message]
          };
      }
      oError[key].label = i18n.t(`fields.${key}`);
  
      throw new errors.ValidationError(i18n.t('errors.validation.message'), oError);
  };    
});

module.exports = hook;