const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored", "interested", "accepted", "rejected"],
            message: `{Value} is not a valid status`
        }
    }
}, 
   {timestamps: true} 

)
// check if the user is trying to send a connection request to themselves
connectionRequestSchema.pre("save", function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send a connection request to yourself");   
    }
   
    
})
const ConnectionRequestModel = new mongoose.model('connectionRequest', connectionRequestSchema);

module.exports = {
 ConnectionRequestModel
};