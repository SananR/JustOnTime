import {checkSchema} from "express-validator";

//Possibly not needed?
const validateUserLoginSchema = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        errorMessage: "Invalid email provided."
    },
    password: {
        isLength: {
            errorMessage: 'Password must be between 6 and 50 characters long',
            options: { min: 6, max: 50},
        },
        matches: {
            options: /\d/,
            errorMessage: "Password must contain a number",
        },
    },
});

const validateUserRegisterSchema = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        errorMessage: "Invalid email provided."
    },
    firstName: {
        errorMessage: 'First name must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        },
        trim: true
    },
    lastName: {
        errorMessage: 'Last name must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        },
        trim: true,
    },
    password: {
        isLength: {
            errorMessage: 'Password must be between 6 and 50 characters long',
            options: { min: 6, max: 50},
        },
        matches: {
            options: /\d/,
            errorMessage: "Password must contain a number",
        },
    },
});
export { validateUserRegisterSchema, validateUserLoginSchema }