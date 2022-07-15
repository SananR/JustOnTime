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
    id: {
        isLength: {
            options: { min: 10, max: 50 }
        },
        errorMessage: "Invalid user id",
    },
    businessName: {
        isLength: {
            options: { min: 5, max: 15 }
        },
        errorMessage: "Invalid business name",
    },
    businessLicense: {
        isLength: {
            options: { min: 9, max: 9 }
        },
        errorMessage: "Invalid business license",
    },
    phoneNumber: {
        isMobilePhone: true,
        errorMessage: "Invalid phone number",
    },
    address: {
        isLength: {
            options: { min: 8, max: 50 }
        },
        errorMessage: "Invalid address name",
    },
    postal: {
        isLength: {
            options: { min: 6, max: 6 }
        },
        errorMessage: "Invalid postal code",
    },
    city: {
        isLength: {
            options: { min: 2, max: 15 }
        },
        errorMessage: "Invalid city",
    },
    province: {
        isLength: {
            options: { min: 2, max: 15 }
        },
        errorMessage: "Invalid province",
    }
});
export { validateUserRegisterSchema, validateUserLoginSchema, validateOrganizerRegisterSchema }