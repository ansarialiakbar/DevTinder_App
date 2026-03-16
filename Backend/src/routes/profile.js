const express = require('express');
const profileRouter = express.Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlewares/auth');
const { validateEditProfileData } = require('../utils/validation');


profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {  
     const user = req.user;
     if(!user){
        throw new Error("User not found");
     }
     res.send(user);
        
    } catch (error) {
        res.status(500).send("ERROR" + error.message);
        
    }
})

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit fields");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.send(loggedInUser)
    } catch (error) {
         res.status(500).send("ERROR" + error.message);
    }
})

//forget password route
profileRouter.patch('/profile/forget-password', async (req, res) => {
    try {
            const {email, newPassword} = req.body;
             if (typeof email !== "string" || typeof newPassword !== "string") {
                    return res.status(400).send("Invalid input");
                } 
            console.log("newPassword", newPassword);
            console.log("email", email)
            
            const user = await User.findOne({email});
            console.log(user);
            if(!user){
                throw new Error("User not found");

            }
               const passwordHash = await bcrypt.hash(newPassword, 10)
               console.log(passwordHash);
               
               user.password = passwordHash;
               await user.save();
               res.send("password updated successfully")
        
    } catch (error) {
        res.status(500).send("ERROR" + error.message);
    }
})


module.exports = profileRouter;