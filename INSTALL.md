# Proyecto Base Backend 
## Archivos de configuración

Para modificar los datos de conexion a la base de datos y para modificar el puerto de conexion de desarrollo modificar :

- src/config/config.json

Para parametros de configuración :

- src/config/config.js

## Instalación NVM, Node y NPM

Descargar el instalador de nvm y renombrarlo con "install_nvm.sh":
```
$ curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.24.0/install.sh -o install_nvm.sh
```

Verifica su existencia si el archivo se descargó satisfactoriamente:
```
$ nano install_nvm.sh
```

Ejecuta el instalador
```
$ bash install_nvm.sh
```

Reiniciar la consola para que surtan efecto los cambios
> **CTRL** + **d** , **CTRL** + **c** o **exit**

Verificar la existencia de nvm
```
$ nvm --version
```

Descargar la versión de node deseada **(la versión LTS)**:
```
$ nvm install 10
```
#### Indicar que version usaremos

Para ello usaremos la siguiente linea de comando
```
$ nvm use 10
```

#### Instalar dependencias npm

Ir a la carpeta del proyecto y ejecutar

```
$ npm install
```

#### Instalar paquetes necesarios 

Instalar de manera global:

```
$ npm install -g sequelize sequelize-cli
$ npm install -g pg pg-hstore
$ npm install -g nodemon
```
## Iniciar la aplicación

Las opciones de ejecución son las siguientes:
+ Genera o regenera las tablas necesarias en la base de datos y ejecuta los seeders y migrations.
```
$ npm start 
$ ctrl + C 
$ npm run setup
```

+ Levanta el sistema en modo developer, se reinicia en cada cambio realizado en los archivos..
```
$ npm run startdev
```
+ Levanta el sistema en modo normal
```
$ npm start
```

# para levantar en producción

+ En el servidor ir a la carpeta < /home/administrador/app >
+ Copiar el proyecto
+ instalar dependencias npm

## Instalar PM2

```
$ npm install pm2 -g
```

### Ejecutar el proyecto en pm2

```
$ pm2 start index.js --name proyecto1
```
### comandos pm2

```
$ pm2 list
```

debera aparecer similar a
┌─────┬────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────┬──────────┐
│ id  │ name       │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user │ watching │
├─────┼────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────┼──────────┤
│ 1   │ proyecto1  │ default     │ 0.0.1   │ fork    │ 30324    │ 22D    │ 111  │ online    │ 0%       │ 34.1mb   │ adm… │ disabled │
│ 0   │ proyecto2  │ default     │ 0.0.1   │ fork    │ 17751    │ 50D    │ 26   │ online    │ 0%       │ 58.1mb   │ adm… │ disabled │


para detener el proyecto

```
$ pm2 stop <id>
```

para eliminar el proyecto de pm2

```
$ pm2 delete <id>
```

para otros comandos revisar: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/