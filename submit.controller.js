const submitModel = require('../models/submit.model');
const outputModel = require('../models/output.model');
const { generateContent } = require('../services/ai.service');
const auditModel = require('../models/audit.model');
const { extractTextFromPDF } = require('../services/pdf.service');
const { extractTextFromDOCX } = require('../services/docx.service');


async function createSubmission(req, res) {
     const { sourceType, content , outputTypes , audience , tone , language , detailLevel , objective } = req.body;

     let sourceContent = content;

     if(sourceType === 'document') {
          
          if(req.file.mimetype === "application/pdf") {
               sourceContent = await extractTextFromPDF(req.file.buffer);

          }else if(req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {

               sourceContent = await extractTextFromDOCX(req.file.buffer);
          }

          if(!sourceContent.trim()) {
               return res.status(400).json({
                    message: "Could not extract text from the document"
               });
          }
     }

     if(sourceType === 'image') {
          sourceContent = "[Image Input]";
     }

     const submission = await submitModel.create({
          user: req.user.id,
          sourceType,
          content: sourceContent,
          outputTypes,
          audience,
          tone,
          language,
          detailLevel,
          objective,
          status: "processing"
     });

     await auditModel.create({
          user: req.user.id,
          action: "CREATE_SUBMISSION",
          resource: "Submission",
          resourceId: submission._id,
          details: `Created Submission with outputs: ${outputTypes.join(", ")}`
     });

     try {
          const outputs = [];

          for(const outputType of outputTypes) {

               const generatedContent = await generateContent(
                    sourceContent,
                    outputType,
                    audience,
                    tone,
                    language,
                    detailLevel,
                    objective,
                    sourceType === "image" ? req.file : null
               );

               const output = await outputModel.create({
                    submission: submission._id,
                    type: outputType,
                    content: generatedContent,
                    status: "completed"
               });

               outputs.push(output);
          }

          submission.status = "completed";
          await submission.save();

          res.status(201).json({
               message: "submission processed successfully",
               submission,
               outputs
          });
     } catch (error) {
          submission.status = "failed";
          await submission.save();

          console.log("AI generation error :" , error);

          res.status(500).json({
               message: "Failed to process submission"
          });
     }
}

async function getMySubmissions(req, res) {

     const submissions = await submitModel.find({
          user: req.user.id
     });

     res.status(200).json({
          submissions
     });
}

module.exports = {
     createSubmission,
     getMySubmissions
}