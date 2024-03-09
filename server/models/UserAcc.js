
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    user_name : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
    },
    user_type : {
        type : String,
    },
    institute_code : {
        type : Number,
    },
    institute_location : {
        type : String,
    },
    gender : {
        type : String,
    },
    course : {
        type : String,
    },
    college : {
        
        type : String,
    }
});

const Account = mongoose.model("User_account" , User);

module.exports = Account;