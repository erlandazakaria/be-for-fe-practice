import { Request } from "express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from 'uuid';

const formatAllowed = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4', 'video/x-msvideo', 'video/x-ms-wmv'];

export const multerFilter = (request: Request, file, cb) => {
  if(formatAllowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export const multerStorage = diskStorage({
  destination: './public',
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1];
    cb(null, `${uuidv4()}-${Date.now()}.${ext}`);
  },
});
