const multer = require('multer');
const Storage = require('@google-cloud/storage');
 
var upload = multer({ storage: multer.MemoryStorage })

const config = {
  CLOUD_BUCKET: 'ecom-image.geekosta.com',
  PROJECT_ID: 'chat-eleon',
}

// prepare storage
const storage = Storage({
  projectId: config.PROJECT_ID,
  keyFilename: 'chat-eleon-a39fb2899cf3.json'
});

// set which bucket
const bucket = storage.bucket(config.CLOUD_BUCKET);

// just a helper to create absolute path to GCS
function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${config.CLOUD_BUCKET}/${filename}`;
}

// the real middleware
function sendUploadToGCS (req, res, next) {
  if (!req.file) {
    return next('upload mungkin gagal');
  }

  const gcsname = Date.now() + '.' + req.file.originalname.split('.').pop();
  const file = bucket.file(gcsname);

  // prepare the stream
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  // handle when upload error
  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  // handle when upload finish
  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic(). //make the uploaded file public
      then(() => {
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
      });
  });

  // write the file
  stream.end(req.file.buffer);
}


module.exports = {
upload, uploadToGCS: sendUploadToGCS
};
