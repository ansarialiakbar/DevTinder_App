// validating user input data before saving databse
const validator = require('validator');

const valiadteSignupData = (req) => {
    const {firstName, lastName, email, password, age, gender, skills} = req.body;
    console.log(firstName);
    
    if(!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }
    if(password.length < 3 || password.length > 15) {
        throw new Error("Password must be between 3 and 15 characters");
    }

}

const validateEditProfileData = (req) => {
    const allowedEditFields = [
        'firstName',
        'lastName',
        'age',
        'gender',
        'skills',
        'photoUrl',
        'about'

    ];
    const isEditAllowed = Object.keys(req.body).every((k) => allowedEditFields.includes(k));
    if(!isEditAllowed){
        throw new Error("Invalid edit fields");
    }
    return isEditAllowed;
};

module.exports = {
   valiadteSignupData,
   validateEditProfileData
}
