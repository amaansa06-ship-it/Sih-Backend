const express = require('express');
const subController = require('../controllers/submit.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validateSubmission = require('../middlewares/submission.validation');
const upload = require('../middlewares/upload.middleware');
const { submissionLimiter } = require('../middlewares/ratelimit.middleware')


const router = express.Router();


router.post('/submission', 
     authMiddleware,
     submissionLimiter, 
     upload.single("file"), 
     validateSubmission, 
     subController.createSubmission);

router.get('/mySubmissions', 
     authMiddleware, 
     subController.getMySubmissions);


module.exports = router;