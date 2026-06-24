const ApiError = require('../utils/ApiError');
const jwt = require('../utils/jwt');
const User = require('../models/User');
const Roles = require('../models/Roles');

const jwtAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Auth running");

    if (!authHeader?.startsWith("Bearer ")) {
        return next(new ApiError(401, 'Token required'));
    }

    const token = authHeader.split(' ')[1];
    console.log("Token:", token);

    try {
        const decoded = jwt.verifyToken({
            token,
            type: jwt.tokenType.ACCESS
        });

        console.log("Decoded:", decoded);

        // 🔥 FETCH FULL USER + ROLE
        const user = await User.findById(decoded.userId)
            .populate('roleId');

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // 🔥 ATTACH FULL DATA
        req.user = {
            userId: user._id,
            roleName: user.roleId?.roleName
        };

        console.log("Final req.user:", req.user);

        next();

    } catch (err) {
        console.log("JWT ERROR:", err);
        next(err);
    }
};

module.exports = jwtAuth;