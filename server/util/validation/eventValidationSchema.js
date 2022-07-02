import {checkSchema} from "express-validator";

const validateEventCreationSchema = checkSchema({
    name: {
        trim: true,
        errorMessage: 'Event name must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        }
    },
    description: {
        trim: true,
        errorMessage: 'Description must be at least 20 characters',
        isLength: {
            options: { min: 20 }
        }
    },
    time: {
        isEmpty: {
            negated: true,
            errorMessage: "Time cannot be empty",
        }
    },
    date: {
        isEmpty: {
            negated: true,
            errorMessage: "Date cannot be empty",
        }
    },
    street: {
        trim: true,
        errorMessage: 'Street must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        }
    },
    city: {
        trim: true,
        errorMessage: 'City must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        }
    },
    country: {
        trim: true,
        errorMessage: 'Country must be between 3 and 50 characters long',
        isLength: {
            options: { min: 3, max: 50 }
        }
    },
    postalCode: {
        trim: true,
        errorMessage: "invalid Postal Code",
        isPostalCode: {
            options:'CA'
        }
    }
});

export { validateEventCreationSchema }