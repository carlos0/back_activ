const qr = require('qr-image');
const config = require('../../config/config');

const image = 'data:image/png;base64,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';

const ticket = (datos) => {
  let activos = '';

  for (let i = 0; i < datos.length; i += 1) {
    const qrCadena = `${datos[i].nombre}|${datos[i].codigo}|${datos[i].sn}|${datos[i].regional.nombre}`;
    const png = qr.imageSync(qrCadena, {
      size: 3,
      margin: 0,
    });
    const qrImg = png.toString('base64');
    if (i % 3 === 0) {
      activos += `
        </tr>
        <tr >
          <td width="33%" class="ticket">
            <table width="100%">
              <tr>
                <td class="imagen" width="25%" colspan="2">
                  <img src="${image}" alt="" width="60px" height="30px">
                </td>
              </tr>
              <tr>
                <td class="qr" width="25%">
                  <img src="data:image/png;base64,${qrImg}" alt="" width="45px" height="50px">
                </td>
                <td class="texto" width="75%">
                  <p class="codigo">${datos[i].codigo}</p>
                  <!--<p class="texto2">${datos[i].nombre}</p>-->
                  <p class="texto2">${datos[i].grupoc.nombre}</p>
                  <p class="texto2">${datos[i].auxiliar.nombre}</p>
                </td>
                </tr>
              </table>
          </td>`;
    } else {
      activos += `
        <td width="33%" class="ticket">
          <table width="100%">
            <tr>
              <td class="imagen" width="25%" colspan="2">
                <img src="${image}" alt="" width="60px" height="30px">
              </td>
              </tr>
            <tr>
              <td class="qr" width="25%">
                <img src="data:image/png;base64,${qrImg}" alt="" width="45px" height="50px">
              </td>

              <td class="texto" width="75%">
                <p class="codigo">${datos[i].codigo}</p>
                <!--<p class="texto2">${datos[i].nombre}</p>-->
                <p class="texto2">${datos[i].grupoc.nombre}</p>
                <p class="texto2">${datos[i].auxiliar.nombre}</p>
              </td>
            </tr>
          </table>
        </td>`;
    }
  }

  const mensaje = {
    html: `
    <!DOCTYPE html>
    <html lang="ess">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ticket</title>
        <style>
          .grid {
            display: inline;
            grid-template-columns: 100px 100px 100px;
            grid-template-rows: 150px;
            gap: 1em;
            width: 100%;
          }
          .grid div {
            background: #E9E9E9;
            border-radius: 20px;
          }
          .imagen {
            text-align: center;
            align-self: center;
          }
          .imagen img {
              padding: 0px;
              margin: 0px;
          }
          .qr {
              text-align: center;
              align-self: center;
          }
          .texto {
              text-align: center;
              font-family: 'Courier New', Courier, monospace;
              line-height : 6px;
              align-self: center
          }
          .codigo {
              font-size: 13px;
              font-weight: bold;
          }
          .texto2 {
              font-size: 7.5px;
          }
          .principal  tr  td {
              border-radius: 10px;
          }
          .ticket {
              border: 1px solid #000;
          }
          td {
              table-layout: auto;
          }
          p {
              margin-block-start: 1px !important;
              margin-block-end: 1px !important;
          }
        </style>
      </head>
      <body>
        <div class="grid">
          <table class="principal" width="100%">
            ${activos}
          </table>
        </div>
      </body>
    </html>`,
  };
  return mensaje;
};

const ticket2 = (datos) => {
  let activos = '';

  for (let i = 0; i < datos.length; i += 1) {
    const qrCadena = `${datos[i].codigo}|${datos[i].id_activo}|${datos[i].grupoc.id_grupoC}|${datos[i].auxiliar.id_auxiliar}|${datos[i].regional.nombre}`;
    const png = qr.imageSync(qrCadena, {
      size: 3,
      margin: 0,
    });
    const qrImg = png.toString('base64');
    if (i % 3 === 0) {
      activos += `
        </tr>
        <tr >
          <td width="33%" class="ticket">
            <table width="100%">
              <tr>
                <td class="imagen" width="25%">
                  <img src="${image}" alt="" width="40px" height="20px">
                </td>
    
                <td class="texto" width="75%">
                  <p class="codigo">${datos[i].codigo}</p>
                  <p class="texto2">${datos[i].nombre}</p>
                  <p class="texto2">${datos[i].grupoc.nombre}</p>
                  <p class="texto2">${datos[i].auxiliar.nombre}</p>
                </td>
    
                <td class="qr" width="25%">
                    <img src="data:image/png;base64,${qrImg}" alt="" width="30px" height="30px">
                </td>
              </tr>
            </table>
          </td>`;
    } else {
      activos += `
        <td width="33%" class="ticket">
          <table width="100%">
            <tr>
              <td class="imagen" width="25%">
                <img src="${image}" alt="" width="40px" height="20px">
              </td>
    
              <td class="texto" width="75%">
                  <p class="codigo">${datos[i].codigo}</p>
                  <p class="texto2">${datos[i].nombre}</p>
                  <p class="texto2">${datos[i].grupoc.nombre}</p>
                  <p class="texto2">${datos[i].auxiliar.nombre}</p>
              </td>
    
              <td class="qr" width="25%">
                  <img src="data:image/png;base64,${qrImg}" alt="" width="30px" height="30px">
              </td>
            </tr>
          </table>
        </td>`;
    }
  }

  const mensaje = {
    html: `
    <!DOCTYPE html>
    <html lang="ess">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ticket</title>
        <style>
          .grid {
              display: inline;
              grid-template-columns: 100px 100px 100px;
              grid-template-rows: 150px;
              gap: 1em;
          }
          .grid div {
              background: #E9E9E9;
              border-radius: 20px;
          }
          .imagen {
              text-align: center;
              align-self: center;
          }
          .qr {
              text-align: center;
              align-self: center;
          }
          .texto {
              text-align: center;
              font-family: 'Courier New', Courier, monospace;
          }
          .codigo {
              font-size: 8px;
              font-weight: bold;
          }
          .texto2 {
              font-size: 6.5px;
          }
          .principal  tr  td {
              border-radius: 10px;
          }
          .ticket {
              border: 1px solid #000;
          }
        </style>
      </head>
      <body>
        <div class="grid">
            <table class="principal" width="100%" cellpadding="0"  cellspacing="0">
                ${activos}
            </table>
        </div>
      </body>
    </html>`,
  };
  return mensaje;
};

module.exports = {
  ticket,
  ticket2,
};
