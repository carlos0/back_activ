const util = require('../../../lib/util.js');

module.exports = (app) => {
  const _app = app;
  _app.controller.funcionario = {};
  const funcionarioController = _app.controller.funcionario;
  const funcionarioModel = app.src.db.models.funcionario;

  const sequelize = app.src.db.sequelize;

  funcionarioController.get = async (req, res) => {
    req.query.where = { estado: 'ACTIVO' };
    req.query.order = [['id_funcionario', 'DESC']];
    try {
      const dataFuncionario = await funcionarioModel.findAndCountAll(req.query);
      if (dataFuncionario != null && dataFuncionario.length !== 0) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente',
          datos: dataFuncionario,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No se encontraron funcionarios registrados.',
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

  funcionarioController.getId = async (req, res) => {
    const idFuncionario = req.params.id;
    try {
      const dataFuncionario = await funcionarioModel.findById(idFuncionario);
      if (dataFuncionario) {
        res.status(200).json({
          finalizado: true,
          mensaje: 'Datos obtenidos exitosamente.',
          datos: dataFuncionario,
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el funcionario solicitada.',
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

  funcionarioController.post = async (req, res) => {
    const funcionarioCrear = req.body;
    funcionarioCrear.estado = 'ACTIVO';
    funcionarioCrear._usuario_creacion = funcionarioCrear.token.id_usuario;
    const t = await sequelize.transaction();
    try {
      const dataFuncionario = await funcionarioModel.create(funcionarioCrear, { transaction: t });
      if (dataFuncionario) {
        await t.commit();
        res.status(200).json({
          finalizado: true,
          mensaje: 'El funcionario se guardo correctamente.',
          datos: dataFuncionario,
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

  funcionarioController.put = async (req, res) => {
    const funcionarioModificar = req.body;
    const idFuncionario = req.params.id;
    try {
      const dataFuncionario = await funcionarioModel.findById(idFuncionario);
      if (dataFuncionario) {
        funcionarioModificar._usuario_modificacion = funcionarioModificar.token.id_usuario;
        await dataFuncionario.updateAttributes(funcionarioModificar);
        res.status(200).json({
          finalizado: true,
          mensaje: 'El funcionario se modifico correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el funcionario solicitada.',
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

  funcionarioController.delete = async (req, res) => {
    const idFuncionario = req.params.id;
    try {
      const datosFuncionario = await funcionarioModel.findById(idFuncionario);
      if (datosFuncionario) {
        await funcionarioModel.update({ estado: 'ELIMINADO', _usuario_modificacion: req.body.token.id_usuario }, { where: { id_funcionario: idFuncionario } })
        res.status(200).json({
          finalizado: true,
          mensaje: 'Se elimino el funcionario correctamente.',
          datos: {},
        });
      } else {
        res.status(204).json({
          finalizado: true,
          mensaje: 'No existe el funcionario solicitada.',
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
