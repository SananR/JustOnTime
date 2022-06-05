function configSerialization(passport){ 
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try{
            return done(null, await dbSelect.findUserById(id));
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    })    
}

export { configSerialization }