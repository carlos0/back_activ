/* eslint no-bitwise: 0 */

/**
 * Retorna código de control generado a partir de los datos de la factura
 *
 * @param  {String} html
 * @return {String} codigo de control
 */
function getCodigoControl(nroAutorizacion, nroFactura, nit, fecha, importe, llave) {
  importe = Math.round(importe).toString();

  /* Paso 1. Obtener y concatenar consecutivamente 2 dígitos Verhoeff al final de los siguientes datos: Número Factura, NIT / CI del
  Cliente, Fecha de la Transacción y Monto de la Transacción. Posteriormente hallar la sumatoria de los datos obtenidos y
  sobre este resultado generar consecutivamente 5 dígitos Verhoeff. Para efectos de Verhoeff, tomar en cuenta el 0 (cero)
  como cualquier otro número, aún cuando este se encuentre a la izquierda de la cifra. */

  nroFactura = nroFactura + getVerhoeff(nroFactura);
  nroFactura = nroFactura + getVerhoeff(nroFactura);
  // console.log('---------------- nroFactura  = ', nroFactura);
  nit = nit + getVerhoeff(nit);
  nit = nit + getVerhoeff(nit);
  // console.log('---------------- nit  = ', nit);
  fecha = fecha + getVerhoeff(fecha);
  fecha = fecha + getVerhoeff(fecha);
  // console.log('---------------- fecha  = ', fecha);
  importe = importe + getVerhoeff(importe);
  importe = importe + getVerhoeff(importe);
  // console.log('---------------- importe  = ', importe);

  const suma = parseInt(nroFactura, 10) + parseInt(nit, 10) + parseInt(fecha, 10) + parseInt(importe, 10);
  // console.log('---------------- suma  = ', suma);
  let digitos = '';
  let nroVeroeff = '';
  let s = suma.toString();
  for (let i = 1; i <= 5; i += 1) {
    nroVeroeff = getVerhoeff(s);
    digitos += nroVeroeff;
    s += nroVeroeff;
    // console.log('---------------- digitos  = ', digitos);
    // console.log('---------------- s  = ', s);
  }
  /* var digitos =  suma.toString();
  digitos = digitos + getVerhoeff(digitos);
  digitos = digitos + getVerhoeff(digitos);
  digitos = digitos + getVerhoeff(digitos);
  digitos = digitos + getVerhoeff(digitos);
  digitos = digitos + getVerhoeff(digitos); */
  // console.log('---------------- digitos  = ', digitos);

  /* Paso 2. Tomando cada uno de los 5 dígitos Verhoeff obtenidos, recuperar de la Llave de Dosificación 5 cadenas adyacentes, cada
  una con un largo definido por el dígito Verhoeff correspondiente más 1. Concatenar la primera cadena obtenida al final del
  dato relacionado al Número de Autorización; la segunda al Número de factura; la tercera al NIT / CI del Cliente; la cuarta a
  la Fecha de la Transacción y la quinta al Monto de la Transacción. */

  let ini = 0;
  let fin = parseInt(digitos.charAt(0), 10) + 1;

  nroAutorizacion = nroAutorizacion + llave.substring(ini, fin);
  // console.log('---------------- ini = ', ini);
  // console.log('---------------- fin = ', fin);
  // console.log('---------------- _nroAutorizacion  = ', _nroAutorizacion);
  ini = fin;
  fin = ini + parseInt(digitos.charAt(1), 10) + 1;

  nroFactura = nroFactura + llave.substring(ini, fin);
  // console.log('---------------- nroFactura  = ', nroFactura);
  // console.log('---------------- ini = ', ini);
  // console.log('---------------- fin = ', fin);

  ini = fin;
  fin = ini + parseInt(digitos.charAt(2), 10) + 1;
  nit += llave.substring(ini, fin);
  // console.log('---------------- nit  = ', nit);
  // console.log('---------------- ini = ', ini);
  // console.log('---------------- fin = ', fin);

  ini = fin;
  fin = ini + parseInt(digitos.charAt(3), 10) + 1;
  fecha += llave.substring(ini, fin);
  // console.log('---------------- fecha  = ', fecha);
  // console.log('---------------- ini = ', ini);
  // console.log('---------------- fin = ', fin);

  ini = fin;
  fin = ini + parseInt(digitos.charAt(4), 10) + 1;
  importe += llave.substring(ini, fin);
  // console.log('---------------- importe  = ', importe);
  // console.log('---------------- ini = ', ini);
  // console.log('---------------- fin = ', fin);

  /* Paso 3. Aplicar el AllegedRC4 a la cadena conformada por la concatenación de todos los datos anteriores, utilizando como llave la
  concatenación de la Llave de Dosificación y los 5 dígitos Verhoeff generados previamente. */

  let allgedrc4 = getAllegedRC4(nroAutorizacion + nroFactura + nit + fecha + importe, llave + digitos);
  // console.log('---------------- allgedrc4 = ', allgedrc4);

  /* Paso 4. Obtener la sumatoria total de los valores ASCII de todos los caracteres de la cadena resultante del paso anterior, además,
  calcular 5 sumatorias parciales de los ASCII de ciertos caracteres de la misma cadena, de acuerdo al siguiente criterio: La
  primera sumatoria parcial tomará las posiciones 1, 6, 11, 16, 21, etc.; la segunda 2, 7, 12, 17, 22, etc.; la tercera 3, 8, 13,
  18, 23, etc.; la cuarta 4, 9, 14, 19, 24,etc. y la quinta 5, 10, 15, 20, 25, etc. */

  let st = 0;
  let sp1 = 0;
  let sp2 = 0;
  let sp3 = 0;
  let sp4 = 0;
  let sp5 = 0;

  allgedrc4 = allgedrc4.replace(/-/g, '');

  for (let i = 0; i < allgedrc4.length; i += 1) {
    sp1 += allgedrc4.charAt(i).charCodeAt(0);
    i += 1;
    if (i < allgedrc4.length) {
      sp2 += allgedrc4.charAt(i).charCodeAt(0);
    }
    i += 1;
    if (i < allgedrc4.length) {
      sp3 += allgedrc4.charAt(i).charCodeAt(0);
    }
    i += 1;
    if (i < allgedrc4.length) {
      sp4 += allgedrc4.charAt(i).charCodeAt(0);
    }
    i += 1;
    if (i < allgedrc4.length) {
      sp5 += allgedrc4.charAt(i).charCodeAt(0);
    }
  }

  st = sp1 + sp2 + sp3 + sp4 + sp5;
  /* console.log('---------------- sp1 = ', sp1);
  console.log('---------------- sp2 = ', sp2);
  console.log('---------------- sp3 = ', sp3);
  console.log('---------------- sp4 = ', sp4);
  console.log('---------------- sp5 = ', sp5);
  console.log('---------------- st = ', st); */

  /* Paso 5. Obtener las multiplicaciones entre la sumatoria total y cada una de las sumatorias parciales. Dividir cada uno de los
  resultados obtenidos entre el dígito Verhoeff correspondiente más 1, el resultado deberá ser truncado. Finalmente obtener
  la sumatoria de todos los resultados y aplicar Base64. */

  const mp1 = parseInt((st * sp1) / (parseInt(digitos.charAt(0), 10) + 1), 10);
  const mp2 = parseInt((st * sp2) / (parseInt(digitos.charAt(1), 10) + 1), 10);
  const mp3 = parseInt((st * sp3) / (parseInt(digitos.charAt(2), 10) + 1), 10);
  const mp4 = parseInt((st * sp4) / (parseInt(digitos.charAt(3), 10) + 1), 10);
  const mp5 = parseInt((st * sp5) / (parseInt(digitos.charAt(4), 10) + 1), 10);
  const mt = mp1 + mp2 + mp3 + mp4 + mp5;
  const base = getBase64SIN(mt);

  /* console.log('---------------- mp1 = ', mp1);
  console.log('---------------- mp2 = ', mp2);
  console.log('---------------- mp3 = ', mp3);
  console.log('---------------- mp4 = ', mp4);
  console.log('---------------- mp5 = ', mp5);
  console.log('---------------- mt = ', mt);
  console.log('---------------- base = ', base); */

  /* Paso 6. Aplicar el AllegedRC4 a la anterior expresión obtenida, utilizando como llave la concatenación de la Llave de
  Dosificación y los 5 dígitos Verhoeff generados anteriormente. */

  const codigoControl = getAllegedRC4(base, llave + digitos);

  return codigoControl;
}

/**
 * Algoritmo de dígito verificador que trabaja con cadenas de dígitos decimales de cualquier tamaño. Además de detectar una amplia gama de errores en datos
 * numéricos, este algoritmo también detecta casos de transposición de dígitos adyacentes. 
 * @param {type} cadena
 * @returns {Number} digito
 */
function getVerhoeff(cadena) {
  const mul = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  ];

  const per = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
  ];

  const inv = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

  const invertido = cadena.split('').reverse().join('');
  let check = 0;

  // console.log(invertido.length);

  // console.log(check);
  // console.log(inv[check]);

  for (let i = 0; i < invertido.length; i += 1) {
    /* console.log('-- i = ', i);
    console.log('-- x = ', ((i + 1) % 8));
    console.log('-- y = ', parseInt(invertido.charAt(i)));
    console.log('-- per = ', per[((i + 1) % 8), parseInt(invertido.charAt(i))]);
    console.log('-- per 2 = ', per[((i + 1) % 8)][parseInt(invertido.charAt(i))]); */
    // check = mul[check, per[((i+1) % 8), parseInt(invertido.charAt(i))]];
    check = mul[check][per[((i + 1) % 8)][parseInt(invertido.charAt(i), 10)]];
  }
  // console.log(' --- check   ', check);
  return inv[check];
}

/**
 * Un algoritmo de criptografía simétrica, basado en cifrado de flujo (stream cipher), muy utilizado por su rendimiento y simplicidad. 
 * @param {type} mensaje
 * @param {type} key
 * @returns {String}
 */
function getAllegedRC4(mensaje, key) {
  const state = [];
  let x = 0;
  let y = 0;
  let index1 = 0;
  let index2 = 0;
  let mensajeCifrado = '';

  for (let i = 0; i <= 255; i += 1) {
    state[i] = i;
  }

  for (let i = 0; i <= 255; i += 1) {
    index2 = (key[index1].charCodeAt(0) + state[i] + index2) % 256;
    // console.log(' ----------a- state[i] = ', state[i]);
    // console.log(' -----------a state[index2] = ', state[index2]);
    const aux = state[i];
    state[i] = state[index2];
    state[index2] = aux;
    index1 = (index1 + 1) % key.length;
    // console.log(' ----------d- state[i] = ', state[i]);
    // console.log(' -----------d state[index2] = ', state[index2]);
  }

  for (let i = 0; i <= mensaje.length - 1; i += 1) {
    x = (x + 1) % 256;
    y = (state[x] + y) % 256;
    const aux = state[x];
    state[x] = state[y];
    state[y] = aux;
    const nmen = mensaje[i].charCodeAt(0) ^ state[(state[x] + state[y]) % 256];
    /* console.log(' ----------- nmen = ', nmen);
    console.log(' ----------- ascii = ', mensaje[i].charCodeAt(0));
    console.log(' ----------- 16h = ', nmen.toString(16) );//parseInt(nmen, 16) */
    mensajeCifrado = mensajeCifrado + '-' + (nmen.toString(16).length === 1 ? '0' + nmen.toString(16) : nmen.toString(16));
    // mensajeCifrado = mensajeCifrado + (nmen.toString(16).length == 1 ? '0'+nmen.toString(16) : nmen.toString(16));
    // console.log(' ----------- mensajeCifrado = ', mensajeCifrado);
  }

  return mensajeCifrado.toString().substring(1, mensajeCifrado.length).toUpperCase();
  // return mensajeCifrado.toUpperCase();
}

/**
 * El algoritmo de Base 64, se trata sencillamente de pasar un número en base 10 a base 64, manteniendo una relación de equivalencia entre número y carácter,
 * por ejemplo A=10, B=11, ../=63
 * Base 64 equivale a hacer la conversión de número a palabras. Para lograrlo se basa en el método de divisiones sucesivas hasta llegar a un cociente 0, los restos
 * en orden inverso, expresados como caracteres, nos dan la palabra resultante. 
 * @param {type} numero
 * @returns {String|getBase64SIN.palabra}
 */
function getBase64SIN(numero) {
  const diccionario = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
    'y', 'z', '+', '/',
  ];

  let cociente = 1;
  let palabra = '';
  let resto = 0;

  while (cociente > 0) {
    cociente = parseInt(numero / 64, 10);
    resto = parseInt(numero % 64, 10);
    // console.log('************** resto = ' , resto);
    // console.log('************** diccionario[resto] = ' , diccionario[resto]);
    palabra = diccionario[resto] + palabra;
    numero = cociente;
  }
  // console.log('************** palabra = ' , palabra);
  return palabra;
}

module.exports = {
  getCodigoControl,
};
