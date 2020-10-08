const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

global._path = __dirname;

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

console.log('inicio');
consign()
  .include('src/lib/middleware_log.js')
  .then('src/config/config.js')
  .then('src/lib/util.js')
  .then('src/db.js')
  .then('src/auth.js')
  .then('src/lib/middlewares.js')
  .then('src/modulos')
  .then('src/lib/boot.js')
  .into(app);
module.exports = app;
