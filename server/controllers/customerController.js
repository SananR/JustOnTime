import passport from 'passport';

const registerCustomer = (req, res, next) => {
    passport.authenticate("registerCustomer", 
    (err, user, info) => {
        if (err) { 
            if (err.code = 11000){
                return res.status(400).send({
                    message: "The email is already used"
                  }) 
            }
            return res.status(400).send({
              message: err
            })
          }
          if (!user) {
            return res.send({
              message: info.message
            }); 
          }
          req.logIn(user, function(err) {
            if (err) { return next(err); }
            console.log("We are logged in!")
            return res.send(user);
          });
    })(req, res, next);
}

export { registerCustomer }