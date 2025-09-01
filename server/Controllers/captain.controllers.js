import { Captain as captainModel } from "../models/captain.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { BlacklistToken as blackListTokenModel } from "../Models/blacklist.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {createCaptain} from "../services/captain.service.js"

const registerCaptain=asyncHandler(async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       throw new ApiError (400,"Invalid input",errors.array());
    }

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
       throw new ApiError(400,"Captain already exist");
    }


    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.cookie('token', token, {
        httpOnly: true,
        secure:true
        
    });
res.status(201).json(new ApiResponse(201,{ token, captain },"Captain registered successfully", ));
})


const loginCaptain = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ApiError(400,"Invalid input",errors.array());
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        throw new ApiError(401,"Invalid email or password");
    }

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
        throw new ApiError(401,"Invalid email or password");
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token,{
        httpOnly: true,
        secure:true
    });

    res.status(200).json(new ApiResponse(200,{ token, captain },"Captain logged in successfully"));
}
)


const getCaptainProfile = asyncHandler(async (req, res, next) => {
    res.status(200).json(new ApiResponse(200,{ captain: req.captain },"Captain profile fetched successfully" ));
})

const logoutCaptain = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json(new ApiResponse(200,{},"Logout successfully"));
})

export {registerCaptain, loginCaptain,getCaptainProfile,logoutCaptain};