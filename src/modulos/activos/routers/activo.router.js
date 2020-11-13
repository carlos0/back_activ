module.exports = (app) => {
  app.api.get('/activo', app.controller.activo.get);
  app.api.get('/activo/:id', app.controller.activo.getId);
  app.api.post('/activo', app.controller.activo.post);
  app.api.put('/activo/:id', app.controller.activo.put);
  app.api.delete('/activo/:id', app.controller.activo.delete);
  app.api.post('/activo/generar/ticket', app.controller.activo.generarTicket);
};
