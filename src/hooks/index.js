
const path = require('path');
const fs = require('fs');
const utils = require('../utils');

const PATH = __dirname;

function init(sequelize) {
  const files = fs.readdirSync(PATH);
  const exclude = ['index.js'];
  utils.removeAll(exclude, files);
  files.forEach((file) => {
    if (!fs.statSync(path.join(PATH, file)).isDirectory()) {
      file = file.split('.')[0];
      require(`./${file}`)(sequelize);
    }
  });
}

module.exports.init = init;