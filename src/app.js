const http = require('http');
const https = require('https');
const fs = require('fs');

const port = 3333;

let options={};

if (port === 21256) {
  options = {
    key: fs.readFileSync(
      '/etc/letsencrypt/archive/www.ibeabuilt.com.br/privkey.pem'
    ),
    cert: fs.readFileSync(
      '/etc/letsencrypt/archive/www.ibeabuilt.com.br/fullchain.pem'
    ),
  };
}

const app = require('./server');


if(port === 3333) {
  const server = http.createServer(app); //Http
  server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
} else {
  const serverHtpps = https.createServer(options, app);
  serverHtpps.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
}

