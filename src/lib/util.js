const config = require('../config/config');
const jwt = require('jwt-simple');

const getDataJWT = (token) => {
  let tokenDecoded = '';
  if (token) {
    tokenDecoded = jwt.decode(token, config.jwtSecret);
  }
  return tokenDecoded;
};

const armarCodigo = (grupoC, auxiliar, regional, correlativo, gestion) => {
  grupoC = grupoC.toString().padStart(2, "0");
  auxiliar = auxiliar.toString().padStart(2, "0");
  regional = regional.toString().padStart(2, "0");
  correlativo = correlativo.toString().padStart(3, "0");
  const codigo = `${regional}${grupoC}${auxiliar}${correlativo}-${gestion}`;
  return codigo;
};

module.exports = {
  getDataJWT,
  armarCodigo
};
