const config = require('../config/config');
const jwt = require('jwt-simple');

const getDataJWT = (token) => {
  let tokenDecoded = '';
  if (token) {
    tokenDecoded = jwt.decode(token, config.jwtSecret);
  }
  return tokenDecoded;
};

/**
 * Funcion para paginar y ordenar.
 * @param {json} query de la peticion http.
 * @return {json} query con datos adicionados.
 */
const paginar = (query) => {
  const respuesta = {};
  // page
  if (query.limit && query.page) {
    respuesta.offset = (query.page - 1) * query.limit;
    respuesta.limit = query.limit;
  }
  // order
  if (query.order) {
    if (query.order.charAt(0) === '-') {
      respuesta.order = `${query.order.substring(1, query.order.length)} DESC`;
    } else {
      respuesta.order = `${query.order}`;
    }
  }
  return respuesta;
};

const formarDerivaciones = (data) => {
  const datos = [];
  for (let i = 0; i < data.id_cargo_destino_ida.length; i += 1) {
    const derivacion = {
      fid_cargo_origen: data.id_cargo_origen,
      fid_cargo_destino: data.id_cargo_destino_ida[i],
      estado: 'ACTIVO',
      _usuario_creacion: data._usuario_creacion,
    };
    datos.push(derivacion);
  }
  return datos;
};

const formarDerivacionesBidireccional = (data, arrayDeriva) => {
  const datos = arrayDeriva;
  for (let i = 0; i < data.id_cargo_destino_bidireccional.length; i += 1) {
    const derivacionIda = {
      fid_cargo_origen: data.id_cargo_origen,
      fid_cargo_destino: data.id_cargo_destino_bidireccional[i],
      estado: 'ACTIVO',
      _usuario_creacion: data._usuario_creacion,
    };
    datos.push(derivacionIda);
    const derivacionVuelta = {
      fid_cargo_origen: data.id_cargo_destino_bidireccional[i],
      fid_cargo_destino: data.id_cargo_origen,
      estado: 'ACTIVO',
      _usuario_creacion: data._usuario_creacion,
    };
    datos.push(derivacionVuelta);
  }
  return datos;
};

module.exports = {
  getDataJWT,
  paginar,
  formarDerivaciones,
  formarDerivacionesBidireccional,
};
