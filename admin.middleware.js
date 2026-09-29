const userModel = require('../models/user.model');

async function adminMiddleware(req, res, next) {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access required"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
}

module.exports = adminMiddleware;