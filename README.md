## Proyecto Base Backend

Las tecnologias utilizadas son:

- **Express** como servidor web ejecutar como npm start
- **Sequelize** como ORM
- **Passport** jwt y LDAP como mecanismos de autenticacion
- **Mocha** como framework de de testing ejecutar como npm testing
- **Chai** soporte para asserts de mocha
- **ApiDoc** documentacion del apiRest ejecutar como npm run apidoc
- **Babel** como compilador de ecma6 a ecma 5
- **eslint** como validador del codigo fuente
- **jsdoc** com o validador de la documentación
- **ejs** como motor de plantillas

TODO: debe integrarse con trabis o gitlab ci , tal vez cambiar a gulp

## Archivos de configuración

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de desarrollo modificar :

- src/config/config.development.js

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de testing modificar :

- src/config/config.test.js

Para modificar el acceso (proteccion via CORS)

- src/lib/middlewares.js

Las opciones de ejecucion son las siguientes:

- **npm start**   levanta el sistema, si el modelo no tiene tablas estas son creadas
- **npm test**  ejecuta el sistema y las pruebas unitarias
- **npm run lint**  ejecuta el eslint para verificar el estandar de programacion, actualmente esta basado en: https://github.com/airbnb/javascript
- **npm run apidoc**  genera el apidoc del apirest y se lo encuentra en la tabla public


## Documentación Versión 1.1

## Requerimientos

De lo anterior se desprenden los siguientes requerimientos:

1. node 6.x

