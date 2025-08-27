import { User as UserModel } from "../Models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {
        throw new ApiError('All fields are required');
    }
    const user = UserModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}