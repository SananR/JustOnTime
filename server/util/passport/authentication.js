import passport from 'passport'
import { clientError } from '../http/httpResponse.js';

const checkAuthentication = (list) => {
    return (req, res, next) => {
        console.log(req.body);
        if(req.isAuthenticated()){
            if(list.length === 0){
                if(req.user._id.toString() === req.body.id){
                    return next();
                }
                return clientError(res, "user is not authorized")
            }
            else{
                if(list.indexOf(req.user.userType) != -1){
                    //has to be fixed 
                    /*if(req.user._id.toString() === req.body.id){
                        return next();
                    }
                    return clientError(res, "user is not authorized")*/
                    return next();
                }
                else{
                    return clientError(res, "user is not authorized")
                }
                
            }
        }
        else{
            return clientError(res, "user is not authenticated")
        }
    };
};

export {checkAuthentication}