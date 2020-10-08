module.exports = (app) => {
  const _app = app;
  _app.dao.autenticacion = {};

  const UsuarioModel = app.src.db.models.usuario;
  const PersonaModel = app.src.db.models.persona;

  async function buscarUsuario(condiciones) {
    const data = await UsuarioModel.findOne({
      where: condiciones,
      include: [{
        model: PersonaModel,
        as: 'persona',
        attributes: ['id_persona', 'nombres', 'primer_apellido', 'segundo_apellido'],
      }],
    });
    return data;
  }
  _app.dao.autenticacion.buscarUsuario = buscarUsuario;
};
