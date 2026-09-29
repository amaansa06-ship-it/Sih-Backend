const outputModel = require("../models/output.model");
const submitModel = require("../models/submit.model");

async function getSubmissionOutputs(req, res) {
     
     const { submissionId } = req.params;

     const submission = await submitModel.findOne({
          _id: submissionId,
          user: req.user.id
     });

     if (!submission) {
          return res.status(404).json({
               message: "Submission not found"
          });
     }

     const outputs = await outputModel.find({
          submission: submissionId
     });

     res.status(200).json({
          outputs
     });
}

module.exports = {
    getSubmissionOutputs
};