// const ApiError = require("../utils/ApiError");
// const jwt = require("../utils/jwt");
// const User = require("../models/User");

// const jwtAuth = async (req, res, next) => {

//     // ✅ Read Access Token from Cookie
//     const token = req.cookies.accessToken;

//     console.log("Auth running");
//     console.log("Cookie Token:", token);

//     if (!token) {
//         return next(new ApiError(401, "Access token required"));
//     }

//     try {

//         const decoded = jwt.verifyToken({
//             token,
//             type: jwt.tokenType.ACCESS
//         });

//         console.log("Decoded:", decoded);

//         const user = await User.findById(decoded.userId)
//             .populate("roleId");

//         if (!user) {
//             return next(new ApiError(404, "User not found"));
//         }

//         req.user = {
//             userId: user._id,
//             roleName: user.roleId.roleName
//         };

//         next();

//     } catch (err) {
//         next(err);
//     }

// };

// module.exports = jwtAuth;

const ApiError = require("../utils/ApiError");
const jwt = require("../utils/jwt");
const User = require("../models/User");

const jwtAuth = async (req, res, next) => {

    console.log("Auth running");

    let token = null;

    // =========================
    // 1️⃣ MOBILE (Bearer Token)
    // =========================
    const authHeader = req.headers.authorization;

    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }

    // =========================
    // 2️⃣ WEB (Cookie Token)
    // =========================
    if (!token && req.cookies?.accessToken) {
        token = req.cookies.accessToken;
    }

    console.log("Token found:", token);

    if (!token) {
        return next(new ApiError(401, "Access token required"));
    }

    try {

        const decoded = jwt.verifyToken({
            token,
            type: jwt.tokenType.ACCESS
        });

        const user = await User.findById(decoded.userId)
            .populate("roleId");

        if (!user) {
            return next(new ApiError(404, "User not found"));
        }

        req.user = {
            userId: user._id,
            roleName: user.roleId.roleName,
            permissions: decoded.permissions
        };

        next();

    } catch (err) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
};

module.exports = jwtAuth;