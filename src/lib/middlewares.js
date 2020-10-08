/* eslint prefer-rest-params: 0 */
/* eslint func-names: 0 */

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jwt-simple');
const helmet = require('helmet');
const i18n = require('./i18n');

module.exports = (app) => {
  // Constante que almacena la congifuracion.
  const configuracion = app.src.config.config;
  // Establece el puerto
  app.set('port', configuracion.puerto);

  // Establece la llave secreta
  app.set('secretJWT', configuracion.jwtSecret);
  app.use(helmet());

  // //Showtests
  app.use((req, res, next) => {
    res.locals.showTests = app.get('env') !== 'production' &&
      req.query.test === '1';
    next();
  });

  // Realiza el uso y configuracion de cors.
  app.use(cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type',
    // 'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    // 'Expires': '-1',
    // 'Pragma': 'no-cache',
  }));

  // Realiza el uso de 'bodyParser' para la recepcion de Json como body.
  app.use(bodyParser.json());

  // Realiza el uso de la autenticacion de passport.
  app.use(app.src.auth.initialize());

  // //eliminar ids en caso de que lo envien por si quieren hacer sqlinjection
  // app.use((req, res, next) => {
  //     delete req.body.id;
  //     next();
  // });
  // para generar un espacio publico, archivos estaticos
  app.use(express.static('public'));

  // app.use(express.static(__dirname + '/public'));
  // // verifica si hay errores en el formato json
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError) {
      res.status(400).json({
        mensaje: 'Problemas en el formato JSON',
      });
    } else {
      res.status(500).send('Error interno!');
      console.error(err.stack);
    }
  });


  // Autenticación -- JWTOKEN
  app.use(configuracion.api.main, (req, res, next) => {
    if (req.headers.authorization) {
    // check header or url parameters or post parameters for token
      const token = req.headers.authorization.split(' ')[1];
      // decode token
      if (token) {
        // verifies secret and checks exp
        const tokenDecoded = jwt.decode(token, app.get('secretJWT'));
        if (tokenDecoded) {
          req.token = {
            id_usuario: tokenDecoded.id_usuario,
            id_persona: tokenDecoded.id_persona,
          };
          next();
        } else {
          return res.status(403).send({
            finalizado: false,
            mensaje: 'Falló la autenticación del token. S',
            datos: {},
          });
        }
      } else {
        return res.status(403).send({
          finalizado: false,
          mensaje: 'Falló la autenticación. T',
          datos: {},
        });
      }
    } else {
      return res.status(403).send({
        finalizado: false,
        mensaje: 'Falló la autenticación. H',
        datos: {},
      });
    }
  });
  // Autenticación -- JWTOKEN - FIN
  // Iniciando API automático de CRUD
  const router = express.Router();
  //  sequelizeCrud.init(router, app.src.db.models, configuracion.api.crud);

  // Definiendo Rutas principales
  app.use(configuracion.api.main, router);
  app.api = router;


  // Definiendo controller
  app.controller = {};
  // Definiendo dao
  app.dao = {};

 // Iniciando la librería de internacionalización
  const pathLang = __dirname.replace('lib', 'lang');
 // Definiendo el idioma español
  i18n.init(pathLang, 'es');


  // express-validation
  app.use((err, req, res, next) => {
    res.status(400).json(err);
  });
};
