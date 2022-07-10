import { clientError, serverError } from "./http/httpResponse.js";
import multer from 'multer';
import path from 'path'
import { unlink } from 'node:fs';

class ImageService {

  constructor(fileType){
    this.fileType = fileType
  }
  storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const dir = `../uploads/event`
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname));
    }
  });


  fileFilter = (req, file, cb) => {
    const filetypes = this.fileType;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb('Invalid file provided.', false);
  };

  upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: this.fileFilter
  });

  uploadImage = (req, res, next) => {
    const uploaded = this.upload.single('image');
    uploaded(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return clientError(res, err.message);
        } else if (err) {
          return serverError(res, err.message);
        }
        next();
    });
  };

  deleteImage = (path) => {
    if (!path) return clientError(res, "No image path provided");
    unlink(path, (err) => {
      if (err) return serverError(res, "An error occurred while deleting the event image file.");
    });
  };

}

const eventImageService = new ImageService(/jpeg|jpg|png/);

export { eventImageService }