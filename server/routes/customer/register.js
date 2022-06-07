import express from 'express'
import passport from 'passport'
const router = express.Router();

router
    .route("/")
    .post((req, res, next) => {
        passport.authenticate("registerCustomer", 
        (err, user, info) => {
            if (err) { 
                if (err.message.includes("duplicate key")){
                    return res.status(400).send({
                        message: "The email is already used"
                      }) 
                }
                return res.status(400).send({
                  message: err.message
                })
              }
              if (!user) {
                return res.send({
                  message: info.message
                }); 
              }
              console.log("We are logging in now!")
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                console.log("We are logged in!")
                return res.send(user);
              });
        })(req, res, next);
    })
    
export { router }