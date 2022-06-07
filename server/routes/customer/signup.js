import express from 'express';
import passport from 'passport';
const router = express.Router();

router
    .route("/")
    .post((req, res, next) => {
        passport.authenticate("registerOrganizer", 
        (err, user, info) => {
            if (err) { 
                return res.status(400).send({
                  message: err
                })
              }
              if (!user) {
                return res.send({
                  message: "You got no user"
                }); 
              }
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                return res.send(user);
              });
        })
    })
    
export { router }