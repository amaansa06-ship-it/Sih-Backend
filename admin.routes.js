const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const auditController = require('../controllers/audit.controller');
const adminController = require('../controllers/admin.controller');


const router = express.Router();

router.get('/admin/audit-logs', authMiddleware, adminMiddleware, auditController.getAuditLogs);

router.get('/admin/users', authMiddleware, adminMiddleware, adminController.getUsers);

module.exports = router;