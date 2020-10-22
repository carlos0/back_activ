const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.activo = {};
  const activoController = _app.controller.activo;
  const activoModel = app.src.db.models.activo;

  const sequelize = app.src.db.sequelize;

  async function getActivos(req, res) {
    req.query.where = { estado: 'ACTIVO' };
    req.query.order = [['id_unidad', 'ASC']];
    try {
      const dataActivos = await activoModel.findAndCountAll(req.query);
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

  activoController.get = getActivos;


  async function getActivosId(req, res) {
    const idSucursal = req.params.id;
    try {
      const dataactivo = await activoModel.findById(idSucursal);
      if (dataactivo) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataactivo,
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

  activoController.getId = getActivosId;


  async function createActivo(req, res) {
    const datosToken = util.getDataJWT(req.headers.authorization.split(' ')[1]);
    const activoCrear = req.body;
    activoCrear.estado = 'ACTIVO';
    activoCrear._usuario_creacion = datosToken.id_usuario;
    activoCrear._fecha_creacion = new Date();
    const sequelizeTransaction = await sequelize.transaction();
    try {
      const dataActivo = await activoModel.create(activoCrear, { transaction: sequelizeTransaction });
      if (dataActivo) {
        sequelizeTransaction.commit();
        res.status(200).json({
          finalizado: true,
          mensaje: 'El activo se guardo correctamente.',
          datos: dataActivo,
        });
      }
    } catch (error) {
      sequelizeTransaction.rollback();
      res.status(412).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  }
  activoController.post = createActivo;

  async function updateActivo(req, res) {
    const activo = req.body;
    const idActivo = req.params.id;
    const datosToken = util.getDataJWT(req.headers.authorization.split(' ')[1]);
    try {
      const dataActivo = await activoModel.findById(idActivo);
      if (dataActivo) {
        activo._usuario_modificacion = datosToken.id_usuario;
        const resActivo = await dataActivo.updateAttributes(activo);
        res.status(200).json({
          finalizado: true,
          mensaje: 'El activo se modifico correctamente.',
          datos: resActivo,
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
  activoController.put = updateActivo;

  async function updateInactivarActivo(req, res) {
    const activo = {};
    const idActivo = req.params.id;
    const datosActivo = util.getDataJWT(req.headers.authorization.split(' ')[1]);
    try {
      const dataActivo = await activoModel.findById(idActivo);
      if (dataActivo) {
        activo._usuario_modificacion = datosActivo.id_usuario;
        activo.estado = 'ELIMINADO';
        const resActivo = await dataActivo.updateAttributes(activo);
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino el activo correctamente.',
          datos: resActivo,
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
  activoController.delete = updateInactivarActivo;
};
