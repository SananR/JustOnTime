import passport from 'passport';

const registerCustomer = async (req, res, next) => {
    await passport.authenticate("registerCustomer", 
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
            return res.status(200).send(user);
          });
    })(req, res, next);
}

export { registerCustomer }