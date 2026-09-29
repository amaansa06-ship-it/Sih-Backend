const { body, validationResult } = require('express-validator');

const allowedSourceTypes = ["text", "document", "image", "url"];

const allowedOutputTypes = ["linkedin", "twitter", "advisory", "infographic", "executive summary", "presentation", "video"];


const validateSubmission = [
  body('sourceType')
    .isIn(["text", "document", "image", "url"])
    .withMessage("Invalid Source Type"),
  
  body('outputTypes')
    .customSanitizer(value => {
      if(Array.isArray(value)) {
        return value;
      }
      return [value];
    })
    .isArray({ min: 1 })
    .withMessage("At least one output is required")
    .custom((outputs) => {
      if (outputs.some(output => !allowedOutputTypes.includes(output))){
        throw new Error("Invalid Output Type");
      }
      if(new Set(outputs).size !== outputs.length) {
        throw new Error("Duplicate Output types are not allowed");
      }

      return true;
    }),

  body('audience')
    .trim()
    .notEmpty()
    .withMessage("Audience is required")
    .isLength({ max: 100 })
    .withMessage("Audience is too long"),

  body('tone')
    .trim()
    .notEmpty()
    .withMessage("Tone is required")
    .isLength({ max: 100 })
    .withMessage("Tone is too long"),

  body('language')
    .trim()
    .notEmpty()
    .withMessage("Language is required")
    .isLength({ max: 100 })
    .withMessage("Language is too long"),

  body('detailLevel')
    .trim()
    .notEmpty()
    .withMessage("Detail level is required")
    .isLength({ max: 50 })
    .withMessage("Detail level is too long"),

  body('objective')
    .trim()
    .notEmpty()
    .withMessage("Objective is required")
    .isLength({ max: 300 })
    .withMessage("Objective is too long"),

  body('content')
    .optional()
    .isLength({ max: 50000 })
    .withMessage("Content is too long"),
    
  (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if(req.body.sourceType === 'document' && !req.file) {
      return res.status(400).json({
        message: "Document file is required for document source",
      });
    }

    if(req.body.sourceType === 'image' && !req.file) {
      return res.status(400).json({
        message: "Image file is required for document source",
      });
    }

    if(req.body.sourceType === 'text' && !req.body.content?.trim()) {
      return res.status(400).json({
        message: 'Content is required for text source',
      });
    }

    next();
  }
];

module.exports = validateSubmission;
