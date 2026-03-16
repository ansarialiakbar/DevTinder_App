const express = require('express');
const requestRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const {ConnectionRequestModel} = require('../models/connectionRequest')
const User = require('../models/user')


requestRouter.post('/connection/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const user = req.user;
        console.log("user:", user);
        
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const isAllowedStatus = ["interested", "ignored"];
        if (!isAllowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status"});
        }

        // check if the toUserId does not exist in the database
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({message: "User not found"});
        }

          // check if the user is trying to send a connection request to themselves
        // if (fromUserId.toString() === toUserId){
        //     return res.status(400).json({message: "you cannot send a connection request to yourself"});
        // }


        // check if a connection request already exist between two users
        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                 {fromUserId, toUserId},
                 {fromUserId: toUserId, toUserId: fromUserId}

                 ]
        })
        if (existingConnectionRequest){
            return res.status(400).json({message: "Connection request already exists"});
        }
        

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        })
        
        const data = await connectionRequest.save();
        console.log("data:", data);
        
        res.status(200).json({ message: user.firstName + " is " + status + " in " + toUser.firstName,
        data,})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
    

})

requestRouter.post('/connection/review/:status/:requestId', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const {status, requestId} = req.params;
           const isAllowedStatus = ["accepted", "rejected"];
        if (!isAllowedStatus.includes(status)){
            return res.status(400).json({message: "Invalid status"});
        }
        console.log(requestId);
        
        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: "interested"
        })
        if(!connectionRequest){
            return res.status(400).json({message: "Connection request not found"})
        }
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        console.log(data);
        return res.status(200).json({message: "Connection request" + " " + status, data});
          
    } catch (error) {
       return res.status(500).json({message: error.message})
      
    }
})
module.exports = requestRouter