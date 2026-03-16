const express = require('express');
const authRouter = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const { valiadteSignupData } = require('../utils/validation');


authRouter.post('/signup', async (req, res) => {
    // console.log(req.body);
    // creating a new user instance of the user model and saving it to the database
    
    try {
        valiadteSignupData(req);
        const {firstName, lastName, email, password, age, gender, skills} = req.body;
        //Encryption of password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
        
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            age,
            gender,
            skills
        })
        console.log(user?.firstName);
        

        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message})
    }
});
authRouter.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid credentials")
        } 
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
           throw new Error("Invalid password");
        } else{
            // Generating a JWT token for authentication
            const token = await user.getJWTToken ();
            res.cookie("token", token);
            res.send("Login Successfull");    
        }
        
    } catch (error) {
        res.status(500).json({ message: "Error in Login", error: error.message})
        
    }
})
//logout route
authRouter.post('/logout', (req, res) => {
    // res.cookie("token", null, { expires: new Date(0)})
    res.clearCookie("token");
    res.send("Logout successfull");
})
module.exports = authRouter;