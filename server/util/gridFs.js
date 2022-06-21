import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path'
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

let gfs =  new mongoose.mongo.GridFSBucket(mongoose.connection, { bucketName: 'images' });


const storage = new GridFsStorage({
  url: process.env.JUSTONTIME_DB_URI_LOCAL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
        };
        resolve(fileInfo);
      });
    });
  }
});

const store = multer({
  storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});


function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb('filetype');
  }

const uploadImage = (req, res, next) => {
    const upload = store.single('eventImage');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
        return clientError(res, "File too large");
        } else if (err) {
        if (err === 'invalid file') return clientError(res, "Invalid image type");
        return serverError(res, "some upload error");
        }
        next();
    });
};

const deleteImage = (id) => {
    if (!id || id === 'undefined') return clientError(res, "No image id");
    const _id = new mongoose.Types.ObjectId(id);
    gfs.delete(_id, (err) => {
      if (err) return serverError(res, "Image deletion error");
    });
};

export {deleteImage, uploadImage}