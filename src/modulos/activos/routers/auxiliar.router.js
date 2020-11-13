module.exports = (app) => {
  app.api.get('/auxiliarGC', app.controller.auxiliarGC.get);
  app.api.get('/auxiliarGC/:id', app.controller.auxiliarGC.getId);
  app.api.post('/auxiliarGC', app.controller.auxiliarGC.post);
  app.api.put('/auxiliarGC/:id', app.controller.auxiliarGC.put);
  app.api.delete('/auxiliarGC/:id', app.controller.auxiliarGC.delete);
};
