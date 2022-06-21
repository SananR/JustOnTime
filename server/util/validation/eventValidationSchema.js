import {checkSchema} from "express-validator";

const validateEventCreationSchema = checkSchema({
    name: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Name cannot be empty",
        }
    },
    description: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Description cannot be empty",
        }
    },
    time: {
        isEmpty: {
            negated: true,
            errorMessage: "Time cannot be empty",
        }
    },
    street: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Street cannot be empty",
        }
    },
    city: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "City cannot be empty",
        }
    },
    country: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "Country cannot be empty",
        }
    },
    postalCode: {
        trim: true,
        isEmpty: {
            negated: true,
            errorMessage: "postalCode cannot be empty",
        }
    }
});

export { validateEventCreationSchema }