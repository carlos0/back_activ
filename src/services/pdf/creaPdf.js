const pdf = require('html-pdf');

const htmlToPdf = (html, nombre) => {
  return new Promise((resolve, reject) => {
    const options = { format: 'Letter', orientation: 'portraid', border: '0', height: '10.5in', width: '8in' }; // border 20
    pdf.create(html, options).toFile(`./public/pdfs/${nombre}.pdf`, (err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};


module.exports = {
  htmlToPdf,
};
