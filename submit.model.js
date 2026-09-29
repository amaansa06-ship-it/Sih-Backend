const mongoose = require('mongoose');


const submitSchema = new mongoose.Schema(
     {
          user: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "user",
               required: true,
          },
          sourceType: {
               type: String,
               enum: ["text", "document", "image", "url"],
               required: true,
          },
          content: {
               type: String,
               required: true,
          },
          outputTypes: {
               type: [String],
               required: true,
          },
          audience: {
               type: String,
               required: true,
          },
          tone: {
               type: String,
               required: true,
          },
          language: {
               type: String,
               required: true,
          },
          detailLevel: {
               type: String,
               required: true,
          },
          objective: {
               type: String,
               required: true,
          },
          status: {
               type: String,
               enum: ["pending", "processing", "completed", "failed"],
               default: "pending",
          }
     },
     {
          timestamps: true,
     }
);


const submitModel = mongoose.model("Submit" , submitSchema);

module.exports = submitModel