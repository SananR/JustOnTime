import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path'
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
dotenv.config();

class EventImageService {
  constructor(options) {
      this.fileTypes = options.fileTypes || /jpeg|jpg|png/;
  }
}
class OrganizerImageService {
  constructor(options) {
      this.fileTypes = options.fileTypes || /jpeg|jpg|png/;
  }
}

export class FileServiceFactory{
  create = (options, bucketName) => {

    let imageService
    if (bucketName === "eventImages") {
      imageService = new EventImageService(options);
    } else if (vehicleType === "organizerImages") {
      imageService = new OrganizerImageService(options);
    } 
    imageService.bucketName = bucketName;

    imageService.gfs =  new mongoose.mongo.GridFSBucket(mongoose.connection, { bucketName: bucketName });

    
    imageService.storage = new GridFsStorage({
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
              bucketName: bucketName,
            };
            resolve(fileInfo);
          });
        });
      }
    });

    imageService.store = multer({
      storage: imageService.storage,
      limits: { fileSize: 10000000 },
      fileFilter: function (req, file, cb) {
        imageService.checkFileType(file, cb);
      },
    });


    imageService.checkFileType = (file, cb) =>{
      const filetypes = options.fileTypes;
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype && extname) return cb(null, true);
      cb('filetype');
    }

    imageService.uploadImage = (req, res, next) => {
        const upload = imageService.store.single('Image');
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

    imageService.deleteImage = (id) => {
        if (!id || id === 'undefined') return clientError(res, "No image id");
        const _id = new mongoose.Types.ObjectId(id);
        imageService.gfs.delete(_id, (err) => {
          if (err) return serverError(res, "Image deletion error");
        });
    };

    return imageService
  }
}

const fileServiceFactory = new FileServiceFactory();

const eventImageService = fileServiceFactory.create({
  fileTypes: /jpeg|jpg|png/
  },"eventImages");

export {eventImageService}