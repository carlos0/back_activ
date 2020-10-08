const util = require('../../../lib/util');

module.exports = (app) => {
  const _app = app;
  _app.controller.usuario = {};
  const usuarioController = _app.controller.usuario;
  const UsuarioModel = app.src.db.models.usuario;

  const PersonaModel = app.src.db.models.persona;
  const UsuarioRolModel = app.src.db.models.usuario_rol;
  const RolModel = app.src.db.models.rol;

  const sequelize = app.src.db.sequelize;

  async function getUsuario(req, res) {
    if (!req.query.order) {
      req.query.order = 'id_usuario DESC';
    }
    const query = util.paginar(req.query);
    query.where = [
      { estado: { $ne: 'ELIMINADO' } },
    ];
    if (req.query.filter) {
      query.where.push({
        $or: [
          sequelize.literal(`"persona"."nombres" ILIKE '${req.query.filter}%'`),
          sequelize.literal(`"persona"."primer_apellido" ILIKE '${req.query.filter}%'`),
          sequelize.literal(`"usuario"."usuario" ILIKE '${req.query.filter}%'`),
        ],
      });
    }
    try {
      const dataUsuario = await UsuarioModel.buscarIncluye(PersonaModel, UsuarioRolModel, RolModel, query);
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
    const dataUsuario = await UsuarioModel.buscarIncluyeOne(idUsuario, PersonaModel, UsuarioRolModel, RolModel);
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

  usuarioController.post = (req, res) => {
    const usuarioCrear = req.body;
    let personaEncontrada;
    let usuarioDevolver = {};
    const personaCrear = {};
    usuarioCrear._usuario_creacion = usuarioCrear.audit_usuario.id_usuario;

    sequelize.transaction().then((t) => {
      PersonaModel.findOne({
        where: {
          documento_identidad: usuarioCrear.documento_identidad,
        },
        transaction: t,
      })
      .then((personaResp1) => {
        if (personaResp1) {
          return personaResp1;
        } else {
          personaCrear.fecha_nacimiento = usuarioCrear.fecha_nacimiento;
          personaCrear.documento_identidad = usuarioCrear.documento_identidad;
          personaCrear.nombres = usuarioCrear.nombres;
          personaCrear.primer_apellido = usuarioCrear.primer_apellido;
          personaCrear.segundo_apellido = usuarioCrear.segundo_apellido;
          personaCrear.estado = 'ACTIVO';
          personaCrear.fid_tipo_documento = usuarioCrear.fid_tipo_documento;
          personaCrear._usuario_creacion = usuarioCrear._usuario_creacion;
          personaCrear.sexo = usuarioCrear.sexo;

          return PersonaModel.create(personaCrear, {
            transaction: t,
          });
        }
      })
      .then((personaResp2) => {
        personaEncontrada = personaResp2;
        return UsuarioModel.findOne({
          where: {
            usuario: usuarioCrear.usuario,
          },
          transaction: t,
        });
      })
      .then((usuarioEncontrado) => {
        if (usuarioEncontrado) {
          throw new Error(`Ya existe un usuario registrado con el correo electrónico proporcionado. Su estado es: ${usuarioEncontrado.estado}`);
        } else {
          if (!usuarioCrear.roles || !usuarioCrear.roles.length || usuarioCrear.roles.length === 0) {
            throw new Error('Debe seleccionar al menos un rol para el usuario que esta creando.');
          }
          // usuarioCrear.estado = 'PENDIENTE';
          usuarioCrear.estado = 'ACTIVO';
          usuarioCrear.usuario = usuarioCrear.usuario;
          usuarioCrear.fid_persona = personaEncontrada.id_persona;
          return UsuarioModel.create(usuarioCrear, {
            transaction: t,
          });
        }
      })
      .then((usuario) => {
        usuarioDevolver = usuario;
        const roles_usuarios_crear = [];
        for (const ur in usuarioCrear.roles) {
          const crearUR = {
            fid_rol: usuarioCrear.roles[ur],
            fid_usuario: usuarioDevolver.id_usuario,
            _usuario_creacion: req.body.audit_usuario.id_usuario,
          };
          roles_usuarios_crear.push(crearUR);
        }
        return UsuarioRolModel.bulkCreate(roles_usuarios_crear, {
          transaction: t,
        });
      })
      .then(() => {
        t.commit();
        return res.status(200).json({
          finalizado: true,
          mensaje: 'Creación de usuario exitoso.',
          datos: usuarioDevolver,
        });
      })
      .catch((error) => {
        t.rollback();
        return res.status(412).json({
          finalizado: false,
          mensaje: error.message,
          datos: {},
        });
      });
    });
  };

  usuarioController.put = (req, res) => {
    const idUsuario = req.params.id;
    const usuarioActualizar = req.body;
    usuarioActualizar._usuario_creacion = req.body.audit_usuario.id_usuario;

    sequelize.transaction().then((t) => {
      UsuarioModel.findOne({
        where: {
          id_usuario: idUsuario,
          estado: 'ACTIVO',
        },
        transaction: t,
      })
      .then((usuarioResp) => {
        if (usuarioResp) {
          if (!usuarioActualizar.roles || !usuarioActualizar.roles.length || usuarioActualizar.roles.length === 0) {
            throw new Error('Debe seleccionar al menos un rol para el usuario que esta creando.');
          }
          return usuarioResp.updateAttributes({ usuario: req.body.usuario }, { transaction: t });
        }
        throw new Error('El usuario no se encuentra registrado en el sistema o no esta activo.');
      })
      .then(() => {
        return PersonaModel.findOne({
          where: {
            documento_identidad: usuarioActualizar.documento_identidad,
          },
          transaction: t,
        });
      })
      .then((personaResp) => {
        if (personaResp) {
          return personaResp.updateAttributes(req.body, { transaction: t });
        }
        throw new Error('La persona no existe, verifique los datos.');
      })
      .then(() => {
        return UsuarioRolModel.update({
          estado: 'ELIMINADO',
          _usuario_modificacion: req.body.audit_usuario.id_usuario,
        }, {
          where: {
            fid_usuario: idUsuario,
            estado: 'ACTIVO',
          },
          transaction: t,
        });
      })
      .then(() => {
        const rolesUsuariosCrear = [];
        for (const ur in usuarioActualizar.roles) {
          const crearUR = {
            fid_rol: usuarioActualizar.roles[ur],
            fid_usuario: idUsuario,
            _usuario_creacion: req.body.audit_usuario.id_usuario,
          };
          rolesUsuariosCrear.push(crearUR);
        }
        return UsuarioRolModel.bulkCreate(rolesUsuariosCrear, {
          transaction: t,
        });
      })
      .then(() => {
        t.commit();
        return res.status(200).json({
          finalizado: true,
          mensaje: 'Actualización de usuario exitoso.',
          datos: { id_usuario: idUsuario },
        });
      })
      .catch((error) => {
        t.rollback();
        return res.status(412).json({
          finalizado: false,
          mensaje: error.message,
          datos: {},
        });
      });
    });
  };
};
