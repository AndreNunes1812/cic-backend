const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname,'..','..','public','images'),
    filename(request, file, callback) {
     // const fileHash= crypto.randomBytes(10).toString('HEX');
      const fileName= `${file.originalname}`;

      return callback(null, fileName);
    }
  }),
};
