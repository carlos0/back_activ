module.exports = (app) => {
  app.api.get('/regional', app.controller.regional.get);
  app.api.get('/regional/:id', app.controller.regional.getId);
  app.api.post('/regional', app.controller.regional.post);
  app.api.put('/regional/:id', app.controller.regional.put);
  app.api.delete('/regional/:id', app.controller.regional.delete);
};
