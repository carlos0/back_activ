const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = null;
module.exports = (app) => {
  const config = app.src.config.config.database;
  if (!db) {
    const sequelize = new Sequelize(
      config.name,
      config.username,
      config.password,
      config.params,
    );

    db = {
      sequelize,
      Sequelize,
      models: {},
    };

    const dirModels = path.join(__dirname, 'models');
    // Obtiene los modelos del directorio 'models'.
    fs.readdirSync(dirModels).forEach((dir) => {
      if (fs.statSync(`${dirModels}/${dir}`).isDirectory()) {
        const subDirModels = path.join(dirModels, dir);
        fs.readdirSync(subDirModels).forEach((file) => {
          const pathFile = path.join(subDirModels, file);
          const model = sequelize.import(pathFile);
          // Almacena los objetos modelo en un JSON.
          db.models[model.name] = model;
        });
      } else {
        const pathFile = path.join(dirModels, dir);
        const model = sequelize.import(pathFile);
        // Almacena los objetos modelo en un JSON.
        db.models[model.name] = model;
      }
    });

    console.log('cargando asociaciones....');
    Object.keys(db.models).forEach((key) => {
      console.log(`---->${key + db.models[key]}`);
      // Control de relaciones(associate) de los modelos.
      if (db.models[key].associate !== undefined) {
        db.models[key].associate(db.models);
      }
    });
  }
  return db;
};
