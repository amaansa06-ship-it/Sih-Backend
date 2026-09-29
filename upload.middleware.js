const multer = require('multer');


const storage = multer.memoryStorage();

const upload = multer({
     storage,
     limits: {
          fileSize: 10 * 1024 * 1024
     },
     fileFilter: (req, file, cb) => {

          const allowedTypes = [
               "application/pdf",
               "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
               "image/jpg",
               "image/png",
               "image/webp"
          ];

          if(allowedTypes.includes(file.mimetype)) {
               cb(null, true);
          }else {
               cb(new Error("Only PDF, DOCX, JPEG, PNG and WEBP files are allowed"));
          }
     }
});

module.exports = upload;