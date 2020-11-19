const util = require('../../../lib/util.js');
const creaPdf = require('../../../services/pdf/creaPdf');
const creaPlantilla = require('../../../services/pdf/creaPlantillas');
const pdf2base64 = require('pdf-to-base64');

module.exports = (app) => {
  const _app = app;
  _app.controller.activo = {};
  const activoController = _app.controller.activo;
  const activoModel = app.src.db.models.activo;
  const auxiliarModel = app.src.db.models.auxiliar;
  const grupoCModel = app.src.db.models.grupoC;
  const parametroModel = app.src.db.models.parametro;

  const sequelize = app.src.db.sequelize;

  activoController.get = async (req, res) => {
    const query = {};
    query.where = { estado: 'ACTIVO' };
    query.order = [['id_activo', 'DESC']];
    query.attributes = ['id_activo', 'nombre', 'codigo', 'oficina', 'observaciones']
    query.include = [{ model: grupoCModel, as: 'grupoc', attributes: ['id_grupoC', 'nombre'] },
                         { model: auxiliarModel, as: 'auxiliar', attributes: ['id_auxiliar', 'nombre'] },
                         { model: parametroModel, as: 'regional', attributes: ['id_parametro', 'nombre'] },
                        ];
    try {
      const dataActivos = await activoModel.findAndCountAll(query);
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

  activoController.getId = async (req, res) => {
    const idActivo = req.params.id;
    const query = {};
    query.where = { id_activo: idActivo };
    query.attributes = ['id_activo', 'nombre', 'codigo', 'oficina', 'observaciones']
    query.include = [ { model: grupoCModel, as: 'grupoc', attributes: ['id_grupoC', 'nombre'] },
                      { model: auxiliarModel, as: 'auxiliar', attributes: ['id_auxiliar', 'nombre'] },
                      { model: parametroModel, as: 'regional', attributes: ['id_parametro', 'nombre'] },
                    ];
  try {
      const dataActivo = await activoModel.find(query);
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
  
  activoController.post = async (req, res) => {
    const activoCrear = req.body;
    console.log('activoCrear: ', activoCrear);
    activoCrear.estado = 'ACTIVO';
    activoCrear._usuario_creacion = activoCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      const correlativoActual = await auxiliarModel.find({ where: { id_auxiliar: activoCrear.fid_auxiliar } })
      const gestion = activoCrear.gestion.toString().substr(-2) || new Date().getFullYear().toString().substr(-2)
      const codigo = util.armarCodigo(activoCrear.fid_grupoc, activoCrear.fid_auxiliar, activoCrear.fid_regional, correlativoActual.correlativo + 1, gestion);
      activoCrear.codigo = codigo
      await activoModel.create(activoCrear, { transaction: t });
      await auxiliarModel.update({ correlativo: correlativoActual.correlativo + 1 }, { where: { id_auxiliar: correlativoActual.id_auxiliar } }, { transaction: t })
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

  activoController.put = async (req, res) => {
    const activoModificar = req.body;
    const idActivo = req.params.id;
    const t = await sequelize.transaction();
    try {
      const dataActivo = await activoModel.findById(idActivo);
      if (dataActivo) {
        activoModificar._usuario_modificacion = activoModificar.token.id_usuario;
        if (dataActivo.fid_auxiliar === activoModificar.fid_auxiliar) {
          await dataActivo.updateAttributes(activoModificar, { transaction: t });
        } else {
          const dataAuxiliarAnt = await auxiliarModel.find({ where: { id_auxiliar: dataActivo.fid_auxiliar } });
          await auxiliarModel.update({ correlativo: dataAuxiliarAnt.correlativo - 1 }, { where: { id_auxiliar: dataAuxiliarAnt.fid_auxiliar } }, { transaction: t });
          const dataAuxiliarNuevo = await auxiliarModel.find({ where: { id_auxiliar: activoModificar.fid_auxiliar } });
          await auxiliarModel.update({ correlativo: dataAuxiliarNuevo.correlativo + 1 }, { where: { id_auxiliar: dataAuxiliarNuevo.fid_auxiliar } }, { transaction: t });
          await dataActivo.updateAttributes(activoModificar, { transaction: t });
        }
        await t.commit();
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
      await t.rollback();
      res.status(412).json({
        finalizado: false,
        mensaje: error.message,
        datos: {},
      });
    }
  }

  activoController.delete = async (req, res) => {
    const idActivo = req.params.id;
    try {
      const dataActivo = await activoModel.findById(idActivo);
      if (dataActivo) {
        await activoModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_activo: idActivo } });
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

  activoController.generarTicket = async (req, res) => {
    try {
      const query = {};
      query.where = { id_activo: req.body.activos };
      query.attributes = ['id_activo', 'nombre', 'codigo'];
      query.include = [ { model: grupoCModel, as: 'grupoc', attributes: ['id_grupoC', 'nombre'] },
                        { model: auxiliarModel, as: 'auxiliar', attributes: ['id_auxiliar', 'nombre'] },
                        { model: parametroModel, as: 'regional', attributes: ['id_parametro', 'nombre'] },
                      ];
      const activos = await activoModel.findAll(query);
      const fechaNombre = new Date();
      const plantilla = creaPlantilla.ticket(activos);
      const pdf = await creaPdf.htmlToPdf(plantilla.html, `${fechaNombre.getFullYear()}${fechaNombre.getMonth() + 1}${fechaNombre.getDate()}${fechaNombre.getHours()}${fechaNombre.getMinutes()}${fechaNombre.getSeconds()}`);
      const pdf64 = await pdf2base64(pdf.filename);
      
      res.status(200).json({
        finalizado: true,
        mensaje: 'El activo se guardo correctamente.',
        datos: { pdf: pdf64 },
      });
    } catch (error) {
      res.status(412).json({
        finalizado: false,
        mensaje: error.message || 'No se pudo guardar, intente mas tarde.',
        datos: {},
      });
    }
  }

};
