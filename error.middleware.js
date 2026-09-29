function errorMiddleware(err, req, res, next) {
     console.log(err);

     if(err.name === "MulterError") {
          return res.status(400).json({
               message: err.message
          });
     }
     if(err.message === "Only PDF, DOCX, JPEG, PNG and WEBP files are allowed") {
          return res.status(400).json({
               message: err.message
          });
     }

     return res.status(500).json({
          message: "Internal Server Error"
     });
}

module.exports = errorMiddleware;