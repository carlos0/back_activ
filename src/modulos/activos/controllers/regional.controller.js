const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.regional = {};
  const regionalController = _app.controller.regional;
  const regionalModel = app.src.db.models.parametro;

  const sequelize = app.src.db.sequelize;

  regionalController.get = async (req, res) => {
    req.query.where = { estado: 'ACTIVO' };
    req.query.order = [['id_parametro', 'ASC']];
    try {
      const dataAuxiliar = await regionalModel.findAndCountAll(req.query);
      if (dataAuxiliar != null && dataAuxiliar.length !== 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: dataAuxiliar,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron regionales registrados.',
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

  regionalController.getId = async (req, res) => {
    const idregional = req.params.id;
    try {
      const dataRegional = await regionalModel.findById(idregional);
      if (dataRegional) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataRegional,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe la regional solicitada.',
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

  regionalController.post = async (req, res) => {
    const regionalCrear = req.body;
    regionalCrear.estado = 'ACTIVO';
    regionalCrear._usuario_creacion = regionalCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      await regionalModel.create(regionalCrear, { transaction: t });
      await t.commit();
      res.status(200).json({
        finalizado: true,
        mensaje: 'La regional se guardo correctamente.',
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

  regionalController.put = async (req, res) => {
    const regionalModificar = req.body;
    const idRegional = req.params.id;
    try {
      const dataRegional = await regionalModel.findById(idRegional);
      if (dataRegional) {
        regionalModificar._usuario_modificacion = regionalModificar.token.id_usuario;
        await dataRegional.updateAttributes(regionalModificar);
        res.status(200).json({
          finalizado: true,
          mensaje: 'La regional contable se modifico correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe la regional contable solicitada.',
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

  regionalController.delete = async (req, res) => {
    const idRegional = req.params.id;
    try {
      const dataRegional = await regionalModel.findById(idRegional);
      if (dataRegional) {
        await regionalModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_activo: idRegional } });
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino la regional correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe la regional solicitado.',
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
