const User = require('../models/User');
const Patient = require('../models/Patient')
const Roles = require('../models/Roles')
const asyncHandler = require('express-async-handler');
const userService = require('../services/user.services')
const authService = require('../services/auth.services')
const ApiResponse = require('../utils/ApiResponse')

exports.signup = asyncHandler(async(req,res)=>{
    const user = await userService.createAuthUser(req.body);
    return res.status(201).send(new ApiResponse(201,user));
});

exports.login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const responseData = await authService.loginUser({
        email,
        password
    });

    // Store Access Token Cookie
    res.cookie("accessToken", responseData.accessToken, {
        httpOnly: true,
        secure: false, // true in production HTTPS
        sameSite: "lax",
        maxAge: 15 * 60 * 1000
    });

    // Store Refresh Token Cookie
    res.cookie("refreshToken", responseData.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Don't send tokens in response body
    delete responseData.accessToken;
    delete responseData.refreshToken;

    res.status(200).json(
        new ApiResponse(200, responseData)
    );

});

exports.loginPatient = asyncHandler(async(req,res)=>{
    console.log("login for patient controller working")
    const {email,password} = req.body;
    const responseData = await authService.loginPatient({email,password});
    res.status(200).json(new ApiResponse(200,responseData));
});

exports.verifyEmail = asyncHandler(async (req, res) => {

    const token = req.query.token; // ✅ extract here

    const result = await authService.verifyUserByToken(token);

    if (result.alreadyVerified) {
        return res.status(200).send(
            new ApiResponse(200, {
                user: result.user
            })
        );
    }

    return res.status(200).send(
        new ApiResponse(200, {
            user: {
                id: result.user._id,
                email: result.user.email,
                status: result.user.status,
                isVerified: result.user.isVerified,
            },
            patient: result.patient
        })
    );
});

exports.forgotPassword = asyncHandler(async(req,res)=>{
    const {email }= req.body;
    const result = await authService.forgotPassword(email);
    return res.status(200).send(new ApiResponse(200,result));
})

exports.resetPassword = asyncHandler(async(req,res)=>{
    const { token } = req.params;
    const {email,password} = req.body;

    const result = await authService.resetPassword({token,email,newPassword : password });
    return res.status(200).send(new ApiResponse(200,result));
})

exports.refreshAccessToken = asyncHandler(async (req, res) => {

    // Mobile → body
    let refreshToken = req.body.refreshToken;

    // Web → cookie fallback
    if (!refreshToken && req.cookies?.refreshToken) {
        refreshToken = req.cookies.refreshToken;
    }

    if (!refreshToken) {
        throw new ApiError(401, "Refresh token required");
    }

    const newAccessToken =
        await authService.refreshAccessToken(refreshToken);

    // If request came from web → set cookie
    if (req.cookies?.refreshToken) {
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        return res.json(new ApiResponse(200, {
            message: "Token refreshed (cookie mode)"
        }));
    }

    // Mobile → return JSON
    return res.json(new ApiResponse(200, {
        accessToken: newAccessToken
    }));
});

exports.logoutPatient = asyncHandler(async (req, res) => {

    const refreshToken = req.cookies.refreshToken;

    await authService.logoutPatient(refreshToken);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json(
        new ApiResponse(200, "Logged out successfully")
    );

});