const validate = require('express-validation');
const paramValidation = require('./usuario.validation');

module.exports = (app) => {
  /**
   * @api {get} /api/v1/usuario?order=&limit=&page=&filter= Lista
   * @apiName ListarUsuarios
   * @apiGroup Usuarios
   * @apiDescription Para devolver la lista de Usuarios
   *
   * @apiParam (Query) {Texto} order (Opcional) Campo por el cual se ordenará el resultado
   * @apiParam (Query) {Numerico} limit (Opcional) Cantidad de resultados a obtener
   * @apiParam (Query) {Numerico} page (Opcional) Número de página de resultados
   * @apiParam (Query) {Texto} filter (Opcional) Texto a buscar en los registros
   *
   * @apiSuccess {Number} id_usuario Id de usuario
   * @apiSuccess {String} email Correo electrónico del usuario
   * @apiSuccess {String} usuario Nombre de usuario del usuario
   * @apiSuccess {String} estado Estado del registro del usuario
   * @apiSuccess {String} persona.documento_identidad Documento de identidad de la persona
   * @apiSuccess {String} persona.complemento_documento Complemento del CI de la persona
   * @apiSuccess {Date} persona.fecha_nacimiento Fecha de Nacimiento de la persona
   * @apiSuccess {String} persona.nombres Nombres de la Persona
   * @apiSuccess {String} persona.primer_apellido Primer Apellido de la Persona
   * @apiSuccess {String} persona.segundo_apellido Segundo Apellido de la Persona
   * @apiSuccess {String} persona.casada_apellido Apellido de Casada de la Persona
   * @apiSuccess {String} persona.sexo Sexo de la Persona
   * @apiSuccess {String} usuarios_roles.id_usuario_rol Identificador de rol_usuario
   * @apiSuccess {String} usuarios_roles.rol.id_rol Identificador de rol
   * @apiSuccess {String} usuarios_roles.rol.nombre Nombre del rol
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *
   *  {
   *    "count": 2,
   *    "rows": [
   *        {
   *        "id_usuario": 1,
   *        "email": "admin",
   *        "usuario": "admin",
   *        "estado": "ACTIVO",
   *        "persona": {
   *          "documento_identidad": "0000000",
   *          "complemento_documento": "00",
   *          "fecha_nacimiento": "1980-01-01T00:00:00.000Z",
   *          "nombres": "AGETIC",
   *          "primer_apellido": "AGETIC",
   *          "segundo_apellido": "AGETIC",
   *          "casada_apellido": null,
   *          "sexo": "M",
   *        },
   *        "usuarios_roles": [
   *         {
   *           "id_rol": 1,
   *           "rol": {
   *             "id_rol": 1,
   *             "nombre": "ADMIN"
   *           }
   *         }
   *         ...
   *        ],
   *      },
   *      ...
   *    ]
   *  }
   */
  app.api.get('/usuario', app.controller.usuario.get);

  /**
   * @api {get} /api/v1/usuario/:id Obtener Usuario
   * @apiName Obtener Usuario
   * @apiGroup Usuarios
   * @apiDescription Para obtener un usuario
   *
   * @apiParam {Number} id Identificador del usuario
   *
   * @apiSuccess {Number} id_usuario Id de usuario
   * @apiSuccess {String} email Correo electrónico del usuario
   * @apiSuccess {String} usuario Nombre de usuario del usuario
   * @apiSuccess {String} estado Estado del registro del usuario
   * @apiSuccess {String} persona.documento_identidad Documento de identidad de la persona
   * @apiSuccess {String} persona.complemento_documento Complemento del CI de la persona
   * @apiSuccess {Date} persona.fecha_nacimiento Fecha de Nacimiento de la persona
   * @apiSuccess {String} persona.nombres Nombres de la Persona
   * @apiSuccess {String} persona.primer_apellido Primer Apellido de la Persona
   * @apiSuccess {String} persona.segundo_apellido Segundo Apellido de la Persona
   * @apiSuccess {String} persona.casada_apellido Apellido de Casada de la Persona
   * @apiSuccess {String} persona.sexo Sexo de la Persona
   * @apiSuccess {String} usuarios_roles.id_usuario_rol Identificador de rol_usuario
   * @apiSuccess {String} usuarios_roles.rol.id_rol Identificador de rol
   * @apiSuccess {String} usuarios_roles.rol.nombre Nombre del rol
   *
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "id_usuario": 1,
   *       "email": "admin",
   *       "usuario": "admin",
   *       "estado": "ACTIVO",
   *       "persona": {
   *         "documento_identidad": "0000000",
   *         "complemento_documento": "00",
   *         "fecha_nacimiento": "1980-01-01T00:00:00.000Z",
   *         "nombres": "AGETIC",
   *         "primer_apellido": "AGETIC",
   *         "segundo_apellido": "AGETIC",
   *         "casada_apellido": null,
   *         "sexo": "M",
   *       },
   *       "usuarios_roles": [
   *         {
   *           "id_rol": 1,
   *           "rol": {
   *             "id_rol": 1,
   *             "nombre": "ADMIN"
   *           }
   *         }
   *         ...
   *       ]
   *     }
   *
   * @apiError No Content
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 204 No Content
   *     {
   *       "msg": "No existe el usuario."
   *     }
   */
  app.api.get('/usuario/:id', validate(paramValidation.getUsuarioId), app.controller.usuario.getId);

   /**
     * @api {post} /api/v1/usuario Registrar Usuarios
     * @apiName Registrar Usuarios
     * @apiGroup Usuarios
     * @apiDescription Para registrar un usuario
     * Registrar un usuario.
     *
     * @apiParam {String} email Email del usuario
     * @apiParam {String} usuario Nombre de usuario
     * @apiParam {String} contrasena Contraseña del usuario
     * @apiParam {String} id_persona Id Persona del usuario
     * @apiParam {Array} roles Array con los roles del usuario
     *
     * @apiParamExample {json} Request-Example:
     *      {
     *        "nombres": "Juan",
     *        "primer_apellido": "Mamani",
     *        "segundo_apellido": "Mamani",
     *        "documento_identidad": "4587655",
     *        "fecha_nacimiento": "1980-12-12",
     *        "fid_tipo_documento": 100,
     *        "email": "correo@gmail.com",
     *        "usuario": "correo",
     *        "contrasena": "123456",
     *        "roles": [2, 3]
     *      }
     *
     * @apiSuccessExample Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *        "estado": "ACTIVO",
     *        "id_usuario": 5,
     *        "email": "correo@gmail.com",
     *        "usuario": "correo",
     *        "contrasena": "e10adc3949ba59abbe56e057f20f883e",
     *        "fid_persona": 2,
     *        "_fecha_modificacion": "2016-07-01T21:20:35.035Z",
     *        "_fecha_creacion": "2016-07-01T21:20:35.035Z",
     *      }
     *
     * @apiError notNull Violación de Valores No Nulos.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 412 Not Null Violation
     *     {
     *       "error": "notNull Violation: usuario cannot be null,\nnotNull Violation: email cannot be null"
     *     }
     */
  app.api.post('/usuario', validate(paramValidation.createUsuario), app.controller.usuario.post);

   /**
   * @api {put} /api/v1/usuario/:id Actualizar usuario
   * @apiName Actualizar Usuarios
   * @apiGroup Usuarios
   * @apiDescription Para actualizar un usuario
   * Actualizar un usuario.
   *
   * @apiParam {Number} id Identificador del usuario
   * @apiParam {Array} roles Array con los roles del usuario
   *
   * @apiParamExample {json} Request-Example:
   *      {
   *        "roles": [2, 3]
   *      }
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *        "id_usuario": 5,
   *     }
   *
   * @apiError notNull Violación de Valores No Nulos.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 412 Not Null Violation
   *     {
   *       "error": "notNull Violation: usuario cannot be null,\nnotNull Violation: email cannot be null"
   *     }
   */
  app.api.put('/usuario/:id', validate(paramValidation.updateUsuario), app.controller.usuario.put);
};
