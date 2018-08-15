// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const EmailCtrl = require('./mailCtrl.js');

const app = express();

//Para aceptar json
app.use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());

//Define el enrutador
const router = express.Router();

// Ruta default
router.get('/', (req, res) => {
  res.send('API está ON!');
});

//Ruta email 
router.post('/email', EmailCtrl.sendEmail);

//Define el prefijo 'api' para conectarse al enrutador
app.use('/api', router);

//Configura el puerto
const port = parseInt(process.env.PORT, 10) || 8000;

//Inicia el servidor
const server = app.listen(port, () => {
  console.log(`App is running at: localhost:${server.address().port}`);
});