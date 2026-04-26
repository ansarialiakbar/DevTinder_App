const express = require('express');
const userRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { ConnectionRequestModel } = require('../models/connectionRequest');
const User = require('../models/user');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

// Get all the pending connection request for the loggedIn user
userRouter.get('/user/pending/request', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate('fromUserId', USER_SAFE_DATA);
        res.status(200).json({ success: true, data: connectionRequests });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})

userRouter.get('/user/connections', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted"},
                {fromUserId: loggedInUser._id, status: "accepted"}
            ]
        }).populate('fromUserId', USER_SAFE_DATA)
        .populate('toUserId', USER_SAFE_DATA)

        const data = connectionRequests.map((row) => {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.status(200).json({message: "Connections fetched successfully", data: data});
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})

//Feed api to get all the users that the loggedIn user has not sent a connection request to and has not recieved a connection request from them and also the user should not be themselves
userRouter.get('/user/feed', userAuth, async(req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 15;
        console.log("page:", page, "limit:", limit);
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id},
                     
            ]
        })
        const excludesUserIds = connectionRequests.reduce((acc, curr) => {
            if(!acc.includes(curr.fromUserId.toString())) {
                acc.push(curr.fromUserId.toString());
            }
            if(!acc.includes(curr.toUserId.toString())) {
                acc.push(curr.toUserId.toString());
            }
            return acc;
        }, []);
        const users = await User.find({
           $and: [
            {_id: {$ne: loggedInUser._id}},
            {_id: {$nin: excludesUserIds}}
           ]

        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.status(200).json({message: "Feed fetched successfully", data: users});
        
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
})

module.exports = userRouter;