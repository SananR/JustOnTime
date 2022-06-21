import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import mongoose from 'mongoose';
import {GridFsStorage} from 'multer-gridfs-storage';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path'

import {Event} from '../models/eventModel.js'

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

const uploadMiddleware = (req, res, next) => {
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

const addEvent = async (req, res, next) => {

    const { file } = req;
    const { id } = file;
    if (file.size > 10000000) {
      deleteImage(id);
      return  clientError(res, "File may not extend 10 mb");
    }
    console.log('uploaded file: ', file);
    try{
        const user = await User.findOne({ 'userInfo.email': email });
    }catch(err){
        deleteImage(id);
        return clientError(res, "No such organizer")
    }
    try{
        const event = new Event(
            {
                eventInfo: {
                    name: req.body.name,
                    description: req.body.description,
                    time: req.body.time,
                    address:{
                        street: req.body.street,
                        city: req.body.city,
                        country: req.body.country,
                        postalCode: req.body.postalCode
                    }
                },
                tags: req.body.tags,
                bidHistory: req.body.bidHistory,
                organizerInfo: {
                    id: user._id, 
                    name: user.userInfo.firstName
                },
                eventImage:{
                    id: id
                }
            }
        )
        await event.save();
        return success(res, "Event Successfully added");
    } catch(err) {
        return clientError(res, "Event couldnot be added")
    }
}

    

export {addEvent,  uploadMiddleware}
