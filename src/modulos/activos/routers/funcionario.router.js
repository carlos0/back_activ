module.exports = (app) => {
  app.api.get('/funcionario', app.controller.funcionario.get);
  app.api.get('/funcionario/:id', app.controller.funcionario.getId);
  app.api.post('/funcionario', app.controller.funcionario.post);
  app.api.put('/funcionario/:id', app.controller.funcionario.put);
  app.api.delete('/funcionario/:id', app.controller.funcionario.delete);
};
