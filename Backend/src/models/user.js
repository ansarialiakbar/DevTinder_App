const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50,

    },
    lastName: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid:" + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        // maxLength: 15
        
    },
    age: {
        type: Number,
        required: true,
        min: 18,
         validate(value) {
            if (value < 18) {
                throw new Error('Age must be at least 18');
            }
        }
       
    },
    gender:{
        type: String,
        validate: function (value) {
            const allowedGenders = ["Male", "Female"];
            if (!allowedGenders.includes(value)){
                throw new Error("Gender is not valid" );
            }
        }
    },
    skills: {
        type: [String],
         validate: function (value) {
            if (value.length < 2) {
                throw new Error('Atleast 2 skills are required');
            }
         }
    },
     photoUrl: {
      type: String,
      default: "https://www.shutterstock.com/image-illustration/missile-man-india-dr-apj-600nw-2310268025.jpg",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid Photo URL: " + value);
        }
      },
    },
    about: {
        type: String,
        default: "Hey there! I am using Devtinder."
    }
    

},
{
        timestamps: true
}
)
userSchema.methods.getJWTToken = function() {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "secret@12345$6789");
    return token;
}
userSchema.methods.comparePassword = async function(userInputPassword){
    const user = this;
    const isPasswordMatch = await bcrypt.compare(userInputPassword, user.password);
    if(!isPasswordMatch){
        throw new Error("Invalid password");
    }
    return isPasswordMatch; 

}
module.exports = mongoose.model('User', userSchema);