
module.exports = (app) => {
  const _app = app;
  _app.controller.persona = {};
  const personaController = _app.controller.persona;
  const PersonaModel = app.src.db.models.persona;
  const usuarioModel = app.src.db.models.usuario;

  async function getPersona(req, res) {
    req.query.where = { estado: 'ACTIVO' };
    req.query.attributes = ['id_usuario', 'usuario'];
    req.query.include = [{ model: PersonaModel, as: 'persona', attributes: ['id_persona', 'nombres', 'primer_apellido', 'segundo_apellido'] }];
    try {
      const dataPersona = await usuarioModel.findAndCountAll(req.query);
      if (dataPersona) {
        if (dataPersona !== null && dataPersona.length !== 0) {
          res.status(200).json({
            finalizado: true,
            mensaje: 'Datos obtenidos exitosamente',
            datos: dataPersona,
          });
        } else {
          res.status(204).json({
            finalizado: true,
            mensaje: 'No se encontraron registros de personas.',
            datos: {},
          });
        }
      }
    } catch (error) {
      res.status(412).json({
        finalizado: false,
        mensaje: error.message,
        datos: {},
      });
    }
  }
  personaController.get = getPersona;
};

