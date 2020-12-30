## Proyecto Base Backend

Las tecnologias utilizadas son:

- **Express** como servidor web ejecutar como npm start
- **Sequelize** como ORM
- **Babel** como compilador de ecma6 a ecma 5
- **eslint** como validador del codigo fuente

## Archivos de configuración

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de desarrollo modificar :

- src/config/config.json

Para parametros de configuración :

- src/config/config.js

Para modificar el acceso (proteccion via CORS)

- src/lib/middlewares.js

Las opciones de ejecucion son las siguientes:

- **npm start**   levanta el sistema, si el modelo no tiene tablas estas son creadas

## Requerimientos

De lo anterior se desprenden los siguientes requerimientos:

1. node 10.x

