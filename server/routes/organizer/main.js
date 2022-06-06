import express from 'express';
const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        res.send("This is organizer main page")
    })
    
export { router }