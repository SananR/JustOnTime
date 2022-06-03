import express from 'express';
const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        res.send("This is customer login page")
    })
    
export { router }