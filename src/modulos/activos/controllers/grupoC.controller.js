const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.grupoC = {};
  const grupoCController = _app.controller.grupoC;
  const grupoCModel = app.src.db.models.grupoC;

  const sequelize = app.src.db.sequelize;

  grupoCController.get = async (req, res) => {
    req.query.where = { estado: 'ACTIVO' };
    req.query.order = [['id_grupoC', 'DESC']];
    try {
      const dataGrupoC = await grupoCModel.findAndCountAll(req.query);
      if (dataGrupoC != null && dataGrupoC.length !== 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: dataGrupoC,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron grupos contables registrados.',
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

  grupoCController.getId = async (req, res) => {
    const idGrupoC = req.params.id;
    try {
      const dataGrupoC = await grupoCModel.findById(idGrupoC);
      if (dataGrupoC) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataGrupoC,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el grupo contable solicitada.',
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

  grupoCController.post = async (req, res) => {
    const grupoCCrear = req.body;
    grupoCCrear.estado = 'ACTIVO';
    grupoCCrear._usuario_creacion = grupoCCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      await grupoCModel.create(grupoCCrear, { transaction: t });
      await t.commit();
      res.status(200).json({
        finalizado: true,
        mensaje: 'El grupo contable se guardo correctamente.',
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

  grupoCController.put = async (req, res) => {
    const grupoCModificar = req.body;
    const idGrupoC = req.params.id;
    try {
      const dataGrupoC = await grupoCModel.findById(idGrupoC);
      if (dataGrupoC) {
        grupoCModificar._usuario_modificacion = grupoCModificar.token.id_usuario;
        await dataGrupoC.updateAttributes(grupoCModificar);
        res.status(200).json({
          finalizado: true,
          mensaje: 'El grupo contable se modifico correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el grupo contable solicitada.',
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

  grupoCController.delete = async (req, res) => {
    const idgrupoC = req.params.id;
    try {
      const dataGrupoC = await grupoCModel.findById(idgrupoC);
      if (dataGrupoC) {
        await grupoCModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_activo: idActivo } });
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino el grupo contable correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el grupo contable solicitada.',
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
