const qr = require('qr-image');
const config = require('../../config/config');

const ticket = (datos) => {
  const mensaje = {
    html: ``,
  };
  return mensaje;
};

module.exports = {
  ticket,
};


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ticket</title>
    <style>
        .grid {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto;
            gap: 1em;
        }
        .grid div {
            background: #ccc;
            padding: 1em;
            border-radius: 20px;
        }
        .grid div:hover {
            border: 1px solid #000;
        }
        .container {
            padding: 0px;
            margin-top: 0px;
        }
        .container .image {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="grid">
        <div class="container">
            <div class="image"><img src="logo.png" width="120px" height="45px"></div>

        </div>
    </div>

</body>
</html>