import express from 'express';
import passport from 'passport';
const router = express.Router();

router
    .route("/")
    .post((req, res, next) => {
        console.log("request body: " + JSON.stringify(req.body));
        passport.authenticate("registerOrganizer", 
        (err, user, info) => {
            if (err) { 
                return res.status(400).send({
                  message: err
                })
              }
              if (!user) {
                return res.send({
                  message: info.message
                }); 
              }
              console.log("User Created");
              console.log(user);
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
              });
        })(req, res, next);
    })
    
export { router }