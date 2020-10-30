const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.asignacion = {};
  const asignacionController = _app.controller.asignacion;
  const asignacionModel = app.src.db.models.asignacion;

  const sequelize = app.src.db.sequelize;

  asignacionController.get = async (req, res) => {
    req.query.where = { estado: 'ACTIVO' };
    req.query.order = [['id_activo', 'DESC']];
    try {
      const dataActivos = await asignacionModel.findAndCountAll(req.query);
      if (dataActivos != null && dataActivos.length !== 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: dataActivos,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron activos registrados.',
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

  asignacionController.getId = async (req, res) => {
    const idActivo = req.params.id;
    try {
      const dataActivo = await asignacionModel.findById(idActivo);
      if (dataActivo) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataActivo,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el activo solicitada.',
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

  asignacionController.post = async (req, res) => {
    const activoCrear = req.body;
    activoCrear.estado = 'ACTIVO';
    activoCrear._usuario_creacion = activoCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      await asignacionModel.create(activoCrear, { transaction: t });
      await t.commit();
      res.status(200).json({
        finalizado: true,
        mensaje: 'El activo se guardo correctamente.',
        datos: {},
      });
    } catch (error) {
      await t.rollback();
      res.status(412).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  }

  asignacionController.put = async (req, res) => {
    const activoModificar = req.body;
    const idActivo = req.params.id;
    try {
      const dataActivo = await asignacionModel.findById(idActivo);
      if (dataActivo) {
        activoModificar._usuario_modificacion = activoModificar.token.id_usuario;
        await dataActivo.updateAttributes(activoModificar);
        res.status(200).json({
          finalizado: true,
          mensaje: 'El activo se modifico correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el activo solicitada.',
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

  asignacionController.delete = async (req, res) => {
    const idActivo = req.params.id;
    try {
      const dataActivo = await asignacionModel.findById(idActivo);
      if (dataActivo) {
        await asignacionModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_activo: idActivo } });
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino el activo correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el activo solicitada.',
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
};
