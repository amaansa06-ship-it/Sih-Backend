const auditModel = require('../models/audit.model');


async function getAuditLogs(req, res) {
     const logs = await auditModel
     .find()
     .populate("user", "name email role")
     .sort({ createdAt: -1 });

     res.status(200).json({
          logs
     });
}


module.exports = {
     getAuditLogs,
};