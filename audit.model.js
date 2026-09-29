const mongoose = require('mongoose');


const auditSchema = new mongoose.Schema({
     user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
     },
     action: {
          type: String,
          required: true,
     },
     resource: {
          type: String,
          required: true,
     },
     resourceId: {
          type: mongoose.Schema.Types.ObjectId,
     },
     details: {
          type: String,
     }
},
{
     timestamps: true,
});

const auditModel = mongoose.model('AuditLog', auditSchema);

module.exports = auditModel;
