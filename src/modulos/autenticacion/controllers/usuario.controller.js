const util = require('../../../lib/util');

module.exports = (app) => {
  const _app = app;
  _app.controller.usuario = {};
  const usuarioController = _app.controller.usuario;
  const UsuarioModel = app.src.db.models.usuario;
  const PersonaModel = app.src.db.models.persona;

  const sequelize = app.src.db.sequelize;

  async function getUsuario(req, res) {
    try {
      const dataUsuario = await UsuarioModel.buscarIncluye(PersonaModel);
      if (dataUsuario.count > 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: {
            count: dataUsuario.count,
            rows: dataUsuario.rows,
          },
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron usuarios registrados.',
          datos: {},
        });
      }
    } catch (error) {
      res.status(412).json({
        finalizado: false,
        mensaje: error.message,
        datos: {},
      });
    }
  }
  usuarioController.get = getUsuario;

  async function getUsuarioId(req, res) {
    const idUsuario = req.params.id;
    const dataUsuario = await UsuarioModel.buscarIncluyeOne(idUsuario, PersonaModel);
    if (dataUsuario) {
      const usuarioDevolver = JSON.parse(JSON.stringify(dataUsuario));
      res.status(200).json({
        finalizado: true,
        mensaje: 'Datos obtenidos correctamente.',
        datos: usuarioDevolver,
      });
    } else {
      res.status(204).json({
        finalizado: false,
        mensaje: 'No existe el usuario solicitado.',
        datos: {},
      });
    }
  }
  usuarioController.getId = getUsuarioId;

  usuarioController.post = async (req, res) => {
    const usuario = req.body;
    console.log('usuario: ', usuario);
    const t = await sequelize.transaction();
    try {
      const personaCrear = {
        documento_identidad: usuario.documento_identidad,
        nombres: usuario.nombres,
        primer_apellido: usuario.primer_apellido,
        segundo_apellido: usuario.segundo_apellido,
        estado: 'ACTIVO',
        _usuario_creacion: usuario.token.id_usuario,
      };
      const personaC = await PersonaModel.create(personaCrear, { transaction: t });
      console.log('personaC: ', personaC);

      const usuarioCrear = {
        usuario: usuario.usuario,
        contrasena: usuario.contrasena,
        cargo: usuario.cargo,
        estado: 'ACTIVO',
        _usuario_creacion: usuario.token.id_usuario,
        fid_persona: personaC.id_persona,
      };
      const usuarioC = await UsuarioModel.create(usuarioCrear, { transaction: t });
      if (usuarioC) {
        t.commit();
        res.status(200).json({
          finalizado: true,
          mensaje: 'El usuario se guardo correctamente.',
          datos: {},
        });
      }
    } catch (error) {
      t.rollback();
      res.status(400).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  };

  usuarioController.put = async (req, res) => {
    const usuario = req.body;
    const idUsuario = req.params.id;
    console.log('idUsuario: ', idUsuario);
    const t = await sequelize.transaction();

    try {
      usuario._usuario_modificacion = usuario.token.id_usuario;
      const buscaUsuario = await UsuarioModel.findById(idUsuario);
      if (buscaUsuario) {
        const buscaPersona = await PersonaModel.findById(buscaUsuario.fid_persona);
        if (buscaPersona) {
          await buscaPersona.updateAttributes(usuario, { transaction: t });
        }
        await buscaUsuario.updateAttributes(usuario, { transaction: t });
        await t.commit();
        res.status(200).json({
          finalizado: true,
          mensaje: 'El usuario se guardo correctamente.',
          datos: {},
        });
      } else {
        throw new error('No se pudo guardar el usuario');
      }

    } catch (error) {
      await t.rollback();
      res.status(400).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  };

  usuarioController.delete = async (req, res) => {
    const idUsuario = req.params.id;
    console.log('idUsuario: ', idUsuario);
    const t = await sequelize.transaction();

    try {
      await UsuarioModel.update({ _usuario_modificacion: req.body.token.id_usuario, estado: 'ELIMINADO' }, { where: { id_usuario: idUsuario } }, { transaction: t });
      await t.commit()
      res.status(200).json({
        finalizado: true,
        mensaje: 'El usuario se elimino correctamente.',
        datos: {},
      });
    } catch (error) {
      console.log('error: ', error);
      await t.rollback();
      res.status(400).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  };
};
