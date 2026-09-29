const mongoose = require("mongoose");

const outputSchema = new mongoose.Schema(
     {
          submission: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Submit",
               required: true
          },
          type: {
               type: String,
               required: true
          },
          content: {
               type: String,
               required: true
          },
          status: {
               type: String,
               enum: ["pending", "completed", "failed"],
               default: "pending"
          }
     },
  {
    timestamps: true
  }
);


const outputModel = mongoose.model("Output", outputSchema);

module.exports = outputModel;