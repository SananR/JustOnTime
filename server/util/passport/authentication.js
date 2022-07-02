import { authError } from '../http/httpResponse.js'

const ERROR_MESSAGE = "Request requires user authentication information.";

const checkAuthentication = (allowedUsers) => {
    return (req, res, next) => {
        if (req.isAuthenticated()) {
            if (allowedUsers.length === 0)
                    return next();
            else {
                if (allowedUsers.includes(req.user.userType))
                    return next();
                else return authError(res, ERROR_MESSAGE);
            }
        }
        else return authError(res, ERROR_MESSAGE);
    };
};
export { checkAuthentication }