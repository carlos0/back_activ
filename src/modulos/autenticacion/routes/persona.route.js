
module.exports = (app) => {
  app.api.get('/persona', app.controller.persona.get);
};
