import asyncHandler from "express-async-handler";
import {Customer} from "./models/testschema.model.js"

//@description     Register new user
//@route           POST /api/users/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
    //const { firstName, lastName, email, password, street, city, country, postalCode, 
    //    suitNo, phoneNumber} = req.body;
    const { firstName, lastName, email, phoneNumber, password} = req.body;

    const userExists = await Customer.findOne({ email });
  
    if (userExists) {
      res.status(404);
      throw new Error("User already exists");
    }
    console.log(userExists)
    /*const user = await Customer.create({
        contact:{
            email,
            phoneNumber
        },
        personalInfo:{
            firstName,
            lastName,
            address:{
                suitNo,
                street,
                city,
                country,
                postalCode
            }
        },
        password,
    });*/
    const user = await Customer.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    });
    console.log(user);
    if (user) {
      res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("User not found");
    }
  });

  export { registerUser };