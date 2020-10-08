const colors = require('colors');

module.exports = (app) => {
  const config = app.src.config.config;
  if (process.env.NODE_ENV !== 'test') {
    app.src.db.sequelize.sync().done(() => {
      if (process.env.FORCE || false) {
        console.log('------------BASE DE DATOS CREADA--------------');
        process.exit(0);
      } else {
        app.listen(app.get('port'), () => {
          console.log(`
                    [#]
                 [#][#]
              [#][#][#][#]
            ╭━━━━━━━━━━━━╮┏━╮╭━┓
            ┃┈┈┈┈┈┈┈┈┈┈┈┈┃╰╮╰╯╭╯
            ┃╰╯┈┈┈┈┈┈┈┈┈┈╰╮╰╮╭╯┈
            ┣━━━╯┈┈┈┈┈┈┈┈┈╰━╯┃┈┈
            ╰━━━━━━━━━━━━━━━━╯┈CaRLoS
	             `.cyan);
          console.info(`Iniciando servidor en el puerto ${app.get('port')} `.green);
          console.info(`API ejecutandose en: http://localhost:${app.get('port')}${config.api.main}`.green);
        });
      }
    });
  } else {
    app.src.db.sequelize.sync().done(() => {
      console.log('------------BASE DE DATOS CREADA--------------');
      if (process.env.FORCE || false) {
        process.exit(0);
      }
    });
  }
};
