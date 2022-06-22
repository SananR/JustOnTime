import { flagError, clientError, serverError, success } from "./http/httpResponse.js";
import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path'
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

class imageService {
  constructor(fileType){
    this.fileType = fileType
  }
  storage = multer.diskStorage({
    destination: function(req, file, cb) {
      const { location } = req.body
      console.log(req.body)
      console.log(req.body.location)
      const dir = `./server/uploads/${location}`
      cb(null, dir);
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
  });


  fileFilter = (req, file, cb) => {
    const filetypes = this.fileType;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb('invalid file');
  };

  upload = multer({
    storage: this.storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: this.fileFilter
  });

  uploadImage = (req, res, next) => {
    const uploaded = this.upload.single('Image');
    uploaded(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        return clientError(res, "File too large");
        } else if (err) {
          console.log(err)
          if (err === 'invalid file') return clientError(res, "Invalid image type");
          return serverError(res, "some upload error");
        }
        next();
    });
  };

  deleteImage = (id) => {
    if (!id || id === 'undefined') return clientError(res, "No image id");
    const _id = new mongoose.Types.ObjectId(id);
    imageService.gfs.delete(_id, (err) => {
      if (err) return serverError(res, "Image deletion error");
    });
  };

}

const eventImageService = new imageService(/jpeg|jpg|png/);

export {eventImageService}