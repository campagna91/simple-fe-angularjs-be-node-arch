const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsP = require('fs').promises;

const bodyParser = require('body-parser');

const app = express();

const UPLOAD_DIR = './upload_dir/';
const port = process.env.PORT || 7777;

var storage;
var upload;

// Check if the destination folder exists, and if not, create it
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

try {
  // Configura Multer per gestire l'upload dei file
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIR); // Specifica la directory di destinazione per i file caricati
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Usa il nome originale del file
    },
  });
  upload = multer({
    storage
  });
} catch (e) {
  throw new Error(e);
}

app.use(bodyParser.json());

// Middleware per servire i file statici dalla directory "public"
app.use(express.static(path.join(__dirname, 'public')));

// Visualizza il modulo di upload
app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  } catch (e) {
    throw new Error(e);
  }
});

// Avvia il server sulla porta specificata
app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack); // Registra l'errore nella console

  // Invia una risposta HTTP con il messaggio di errore e lo stato specificato
  res.status(500).json({
    message: err,
    data: err.stack
  });
});
