import {User as userModel} from '../Models/user.model.js';
import asyncHandler from "../utils/asyncHandler.js"
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from "../utils/ApiError.js";
import { createUser} from "../services/user.service.js"
import { validationResult } from 'express-validator';
import { BlacklistToken as blackListTokenModel} from '../Models/blacklist.model.js';


const register = asyncHandler(async (req,res)=>{

  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400,"validation error",errors.array())
    }

    const { fullname, email, password } = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        throw new ApiError(400,"User already exist")
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    return res.status(201).json(new ApiResponse(200,{ token, user },"user registration succesfully"));



})

const login = async (req, res) => {

   const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400,"validation error",errors.array())
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
       throw new ApiError(401,"Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401,"Invalid email or password");
    }

    const token = user.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure: true
    });

    res.status(200).json(new ApiResponse(200,{ token, user },"user login successfully"));

};

const logoutUser=asyncHandler(async (req,res)=>{
   
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
    res.clearCookie('token');
    await blackListTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out' });


})

const getUserProfile = async (req, res) => {
   // Handle getting user profile
   const user=req.user;
   console.log("user is for get route", user);

   return res.status(200).json(new ApiResponse(200,user,"user profile fetched successfully"));
};

export {register,login,logoutUser,getUserProfile};