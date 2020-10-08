const params = require('./config.json');
const logger = require('../lib/logger');

/* Determinar el entorno de desarrollo del sistema */

let env = process.env.NODE_ENV;
if (!env) {
  env = 'development';
}
if (!params.hasOwnProperty(env)) {
  env = 'development';
}

module.exports = {
  // datos de configuración para de la base de datos
  database: {
    name: params[env].database,
    username: params[env].username,
    password: params[env].password,
    timezone: '-04:00',
    lang: 'es',
    params: {
      dialect: params[env].dialect,
      port: params[env].port,
      host: params[env].host,
      sync: { force: process.env.FORCE || false,
      },
      logging: (sql) => {
        if (env === 'development') {
          logger.log('info', `[${new Date()}] ${sql}`);
        }
      },
      define: {
        underscored: true,
      },
    },
  },
  // Datos de la base de las rutas
  api: {
    main: '/api/v1/',
    public: '/',
    crud: 'rest/',
  },
  // datos de configuración para la conexión con el servicio de correos
  correo: {
    mail: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      ignoreTLS: false,
      tls: {
        rejectUnauthorized: false,
      },
      user: 'afcoop01@gmail.com',
      pass: 'contrasena21',
    },
  },
  // configuracion con jwt poner una palabra secreta segura
  jwtSecret: '4f<00p-2019',
  jwtSession: { session: false },
  puerto: 4000,
};
