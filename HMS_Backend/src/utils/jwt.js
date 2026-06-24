const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const tokenType = {
    ACCESS: "ACCESS",
    VERIFY_EMAIL: "VERIFY_EMAIL",
    REFRESH: "REFRESH", // ✅ NEW
};

const tokenConfig = {
    ACCESS: {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: "30m",
    },
    VERIFY_EMAIL: {
        secret: process.env.JWT_VERIFY_SECRET,
        expiresIn: "1h",
    },
    REFRESH: {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: "7d",
    },
};

// 🔥 GENERATE TOKEN
const generateToken = ({ payload, type }) => {
    const config = tokenConfig[type];

    if (!config) {
        throw new ApiError(500, "Invalid token type");
    }

    return jwt.sign(
        {
            ...payload,
            type,
        },
        config.secret,
        {
            expiresIn: config.expiresIn,
        }
    );
};

// 🔥 VERIFY TOKEN
const verifyToken = ({ token, type }) => {
    const config = tokenConfig[type];

    if (!config) {
        throw new ApiError(500, "Invalid token type");
    }

    try {
        const payload = jwt.verify(token, config.secret);

        if (payload.type !== type) {
            throw new ApiError(401, "Invalid token type");
        }

        return payload;
    } catch (err) {
        throw new ApiError(401, "Token expired or invalid");
    }
};

module.exports = {
    generateToken,
    tokenType,
    verifyToken,
};