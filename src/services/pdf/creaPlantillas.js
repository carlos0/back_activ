const qr = require('qr-image');
const config = require('../../config/config');

const plantilla = (datos) => {
  const qrCadena = `${config.factura.nitEmpresa}|${datos.nroFactura}|${config.factura.nroAutorizacion}|${datos.fecha}|${datos.importe}|${datos.importeCreditoFiscal || 0}|
  ${datos.codigoControl}|${datos.nit_ci}|${datos.importeICE || 0}|${datos.importeTasaCero || 0}|${datos.importeNoCreditoFiscal || 0}|${datos.descuentos || 0}`;
  const png = qr.imageSync(qrCadena, {
    size: 3,
    margin: 0,
  });
  const qrImg = png.toString('base64');
  let matriz = '';
  if (config.factura.matriz) {
    matriz = `
        <p>Casa matriz</p>
        <p>${config.factura.matriz.direccion}</p>
        <p>${config.factura.matriz.telefono}</p>
        <p>${config.factura.matriz.departamento}</p>`;
  }
  let sucursal = '';
  if (config.factura.sucursal) {
    sucursal = `
        <p>SUCURSAL N° ${datos.numeroSucursal}</p>
        <p>${config.factura.sucursal.direccion}</p>
        <p>${config.factura.sucursal.telefono}</p>
        <p>${config.factura.sucursal.departamento} - BOLIVIA</p>`;
  }
  let detalle = '';
  for (let i = 0; i < datos.detalle.length; i += 1) {
    detalle += `<tr> 
        <td>${datos.detalle[i].cantidad}</td>
        <td>${datos.detalle[i].descripcion}</td>
        <td align="right">${datos.detalle[i].precioUnitario}</td>
        <td align="right">${datos.detalle[i].subtotal}</td>
      </tr>`;
  }
  const mensaje = {
    html: `<html>
        <head>
          <meta charset="utf8">
          <title>Factura electronica</title>
          <style>
            html, body {
              width: 7cm;
              margin: 10px;
              padding: 0;
              font-family: Tahoma, Verdana, Segoe, sans-serif;        
              font-size: 8px;        
              -webkit-print-color-adjust: exact;
              box-sizing: border-box;
            }
            h1 {
              font-size: 12px;
              text-align:center
            }
            h2 {
              font-size: 10px;
              text-align:center
            }
            table, p {
              font-size: 10px
            }
            table {
              border: 0
            }
            .interlineado {
              line-height:5px;
            }
            .centrado {
              text-align:center;
            }       
            .derecha {
              text-align:right
            }
          </style>
        </head>
        <body>
      
        <div>
          <h1>${config.factura.razon_social}</h1>
          <div class="centrado interlineado">
            ${matriz}
            ${sucursal}
          </div>
          <br />
          <h1>FACTURA</h1>
          <h2></h2>
          <hr/>    
          <table>
            <tr><td>NIT:</td><td>${config.factura.nitEmpresa}</td></tr>
            <tr><td>N° FACTURA:</td><td>${datos.nroFactura}</td></tr>
            <tr><td>N° AUTORIZACIÓN:</td><td>${config.factura.nroAutorizacion}</td></tr>    
          </table>
          <hr/>
          <p class="centrado">${datos.actividadEconomica}</p>
          
          <p>Fecha: ${datos.fecha} Hora: ${datos.hora}</p>
          <p>NIT/CI: ${datos.nit_ci}</p>
          <p>Señor(es): ${datos.senores}</p>
          <br />
          <table>
            <tr><td>CANT.</td> <td>DETALLE</td> <td>PRECIO U.</td> <td>IMPORTE</td></tr>      
            ${detalle}
            <tr> 
               <td></td>
               <td></td>
               <td><b>TOTAL Bs.</b></td>
               <td align="right">${datos.importe}</td>
              </tr> 
          </table>
          <hr/>
          <p>SON: ${datos.totalLiteral}</p>
          <p><b>CÓDIGO DE CONTROL: ${datos.codigoControl}</b></p>
          <p><b>FECHA LIMITE DE EMISION: ${datos.fechaLimiteEmision}<b></p>
          <p class="centrado"><img src="data:image/png;base64,${qrImg}" height="80" width="80"></p>
          <p class="centrado"><b>${config.factura.leyenda}</b></p>
        </div>
        </body>
      </html>`,
  };
  return mensaje;
};

module.exports = {
  plantilla,
};
