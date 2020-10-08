const nodemailer = require('nodemailer');
const fs = require('fs');
const inlineBase64 = require('nodemailer-plugin-inline-base64');
const config = require('../../config/config');
const logger = require('../../lib/logger');

async function enviarMail(transporter, mailOptions) {
  /* return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        const errorMail = err;
        if (err.message.indexOf('No recipients defined') > -1) errorMail.message = 'El correo destino no es valido.';
        if (err.message.indexOf('getaddrinfo ENOTFOUND') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
        if (err.message.indexOf('connect ECONNREFUSED') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
        if (err.message.indexOf('140770FC') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
        if (err.message.indexOf('Invalid login') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
        if (err.message.indexOf('unable to verify the first certificate') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
        logger.info(`[${__filename}] Ocurrio un error -> ${errorMail.message}`);
        return reject(errorMail);
      }
      logger.info(`[${__filename}] Enviando correo a : ${mailOptions.from}`);
      resolve(res);
    });
  }); */
  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (err) {
    const errorMail = err;
    if (err.message.indexOf('No recipients defined') > -1) errorMail.message = 'El correo destino no es valido.';
    if (err.message.indexOf('getaddrinfo ENOTFOUND') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
    if (err.message.indexOf('connect ECONNREFUSED') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
    if (err.message.indexOf('140770FC') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
    if (err.message.indexOf('Invalid login') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
    if (err.message.indexOf('unable to verify the first certificate') > -1) errorMail.message = 'En este momento no se puede realizar el envio de correo de confirmación.';
    logger.info(`[${__filename}] Ocurrio un error -> ${errorMail.message}`);
    throw err;
  }
}

module.exports.sendMail = (subject, param, to, pdf) => {
  const smtpConfig = {
    host: config.correo.mail.host,
    port: config.correo.mail.port,
    secure: config.correo.mail.secure,
    ignoreTLS: config.correo.mail.ignoreTLS,
    debug: true,
    auth: {
      user: config.correo.mail.user,
      pass: config.correo.mail.pass,
    },
    tls: {
      rejectUnauthorized: config.correo.mail.tls.rejectUnauthorized,
    },
  };

  const transporter = nodemailer.createTransport(smtpConfig);
  transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));
  transporter.on('attachment', (attachment, mail) => {
    if (!attachment.contentId.includes('somePrefix')) { // process only images attached by user in reply
        // ...
    }
  });

  if (pdf === undefined) {
    const mailOptions = {
      from: config.app.correo.mail.user,
      to,
      subject,
      html: param.html,
    };
    return enviarMail(transporter, mailOptions);
  } else
  {
    return fs.readFile(pdf, (err, datos) => {
      if (err) {
        throw err;
      }
      const mailOptions = {
        from: config.correo.mail.user,
        to,
        subject,
        html: param.html,
        attachments: [
          {
            filename: 'Factura Electrónica.pdf',
            content: datos,
            contentType: 'application/pdf',
          },
        ],
      };
      return enviarMail(transporter, mailOptions);
    });
  }
};
