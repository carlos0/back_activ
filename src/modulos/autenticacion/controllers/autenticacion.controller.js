const jwt = require('jwt-simple');
const crypto = require('crypto');

module.exports = (app) => {
  const _app = app;
  _app.controller.autenticacion = {};

  async function autenticar(req, res) {
    if (!req.body.username || !req.body.password) {
      res.status(412).json({
        finalizado: false,
        mensaje: 'Los datos Usuario y Contraseña son obligatorios',
        datos: {},
      });
    }
    const usuario = req.body.username;
    const contrasena = req.body.password;
    const password = crypto.createHash('md5').update(contrasena).digest('hex');
    try {
      const data = await obtenerDatos(usuario, password);
      res.status(200).json(data);
    } catch (error) {
      res.status(412).json({
        finalizado: false,
        mensaje: error.message,
        datos: {},
      });
    }
  }

  async function obtenerDatos(usuario, password) {
    let condiciones = {};
    condiciones = {
      usuario,
      contrasena: password,
      estado: 'ACTIVO',
    };
    try {
      const datosUsuario = await app.dao.autenticacion.buscarUsuario(condiciones);
      if (datosUsuario && datosUsuario.id_usuario) {
        const ven = new Date();
        ven.setDate(ven.getDate() + 1);
        const payload = {
          id_usuario: datosUsuario.id_usuario,
          usuario: datosUsuario.usuario,
          id_persona: datosUsuario.persona.id_persona,
          vencimiento: ven,
        };
        const usuarioEnviar = {
          id_usuario: datosUsuario.id_usuario,
          nombres: datosUsuario.persona.nombres,
          apellidos: `${datosUsuario.persona.primer_apellido} ${datosUsuario.persona.segundo_apellido}`,
          usuario: datosUsuario.usuario,
          cargo: datosUsuario.cargo,
          estado: datosUsuario.estado,
        };
        const resultado = {
          finalizado: true,
          mensaje: 'Obtención de datos exitoso.',
          datos: {
            token: jwt.encode(payload, app.settings.secretJWT),
            usuario: usuarioEnviar,
          },
        };
        return resultado;
      }
    } catch (error) {
      throw new Error(error);
    }
    return false;
  }


  _app.controller.autenticacion.post = autenticar;
};
