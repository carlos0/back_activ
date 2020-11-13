module.exports = (app) => {
  app.api.get('/grupoC', app.controller.grupoC.get);
  app.api.get('/grupoC/:id', app.controller.grupoC.getId);
  app.api.post('/grupoC', app.controller.grupoC.post);
  app.api.put('/grupoC/:id', app.controller.grupoC.put);
  app.api.delete('/grupoC/:id', app.controller.grupoC.delete);
};
