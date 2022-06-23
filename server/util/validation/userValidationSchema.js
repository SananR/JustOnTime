import {checkSchema} from "express-validator";

const validateUserLoginSchema = checkSchema({
    email: {
        isEmail: true,
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Email cannot be empty",
        },
        errorMessage: "Invalid email provided."
    },
    password: {
        isEmpty: {
            negated: true,
            errorMessage: "Password cannot be empty",
        }
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
            options: { min: 2, max: 50 }
        },
        trim: true
    },
    lastName: {
        errorMessage: 'Last name must be between 3 and 50 characters long',
        isLength: {
            options: { min: 2, max: 50 }
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

const validateOrganizerRegisterSchema = checkSchema({
    phoneNumber:{
        isMobilePhone: true,
        errorMessage: "Invalid phoneNumber",
    }
});
export { validateUserRegisterSchema, validateUserLoginSchema, validateOrganizerRegisterSchema }