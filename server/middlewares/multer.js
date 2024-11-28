// for image uploads
import multer from "multer";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads"); // image will be saved here
  },
  filename(req, file, cb) {
    const id = uuid(); // random id generation
    const extName = file.originalname.split(".").pop(); // this will give extension name of file eg: .png, .jpg etc
    const filename = `${id}.${extName}`; // name of the image file
    cb(null, filename);
  },
});

export const uploadFiles = multer({ storage }).single("image");
