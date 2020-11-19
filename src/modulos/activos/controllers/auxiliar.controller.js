const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.auxiliarGC = {};
  const auxiliarController = _app.controller.auxiliarGC;
  const auxiliarModel = app.src.db.models.auxiliar;
  const grupoCModel = app.src.db.models.grupoC;

  const sequelize = app.src.db.sequelize;

  auxiliarController.get = async (req, res) => {
    const query = {};
    query.where = { estado: 'ACTIVO' };
    query.order = [['id_auxiliar', 'DESC']];
    query.attributes = ['id_auxiliar', 'nombre'];
    query.include = [{ model: grupoCModel, as: 'grupoC', attributes: ['id_grupoC', 'nombre'] }]
    try {
      const dataAuxiliar = await auxiliarModel.findAndCountAll(query);
      if (dataAuxiliar != null && dataAuxiliar.length !== 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: dataAuxiliar,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron auxiliar de grupos contables registrados.',
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

  auxiliarController.getId = async (req, res) => {
    const query = {};
    const idAuxiliar = req.params.id;
    query.where = { id_auxiliar: idAuxiliar };
    query.attributes = ['id_auxiliar', 'nombre'];
    query.include = [{ model: grupoCModel, as: 'grupoC', attributes: ['id_grupoC', 'nombre'] }]

    try {
      const dataAuxiliar = await auxiliarModel.findOne(query);
      if (dataAuxiliar) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataAuxiliar,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el auxiliar solicitada.',
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

  auxiliarController.post = async (req, res) => {
    const auxiliarCrear = req.body;
    auxiliarCrear.estado = 'ACTIVO';
    auxiliarCrear._usuario_creacion = auxiliarCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      await auxiliarModel.create(auxiliarCrear, { transaction: t });
      await t.commit();
      res.status(200).json({
        finalizado: true,
        mensaje: 'El auxiliar de grupo contable se guardo correctamente.',
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

  auxiliarController.put = async (req, res) => {
    const auxiliarModificar = req.body;
    const idAuxiliar = req.params.id;
    try {
      const dataAuxiliar = await auxiliarModel.findById(idAuxiliar);
      if (dataAuxiliar) {
        auxiliarModificar._usuario_modificacion = auxiliarModificar.token.id_usuario;
        await dataAuxiliar.updateAttributes(auxiliarModificar);
        res.status(200).json({
          finalizado: true,
          mensaje: 'El auxiliar de grupo contable se modifico correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el auxiliar de grupo contable solicitada.',
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

  auxiliarController.delete = async (req, res) => {
    const idAuxiliar = req.params.id;
    try {
      const dataAuxiliar = await auxiliarModel.findById(idAuxiliar);
      if (dataAuxiliar) {
        await auxiliarModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_auxiliar: idAuxiliar } });
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino el auxiliar de grupo contable correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el auxiliar de grupo contable solicitado.',
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
