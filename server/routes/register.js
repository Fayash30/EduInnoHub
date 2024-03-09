
const User = require("../models/UserAcc");
const bcrypt = require('bcrypt')
const validator = require('validator');


exports.AddUser = async (req,res)=> {
    try{

       
        let user = await User.findOne({user_name : req.body.formData.user_name});   
        let mail = await User.findOne({email : req.body.formData.email});

        if (mail)
        {
            throw Error("Email already Exists!");
        }
        if(user)
        {
            throw Error("UserName already Exists! ");
        }

        
        if(!req.body.formData.name){
            throw Error("Enter your Name")
        }
        if(!req.body.formData.user_name){
            throw Error("Enter your userName")
        }
        if(!req.body.formData.email){
            throw Error("Mail is Required")
        }
        if(!req.body.formData.password){
            throw Error("Enter the Password")
        }
        if(!validator.isEmail(req.body.formData.email)){
            throw Error("Email is not valid ")
        }
        if(!validator.isStrongPassword(req.body.formData.password)){
            throw Error("Your password is Weak")
        }
        req.body.formData.password = await bcrypt.hash(req.body.formData.password,10)

        await User.create(
            req.body.formData
        )
        res.send({status:'ok'})
        console.log(req.body)
        
    }
    catch(err){
        console.log("Error : " + err)
        res.json({status : 'error' ,error : err.message})
    }
}

exports.getUsers = async (req,res) =>{
    try {
    
        const users = await User.find().sort();
    
        res.json({ users });
      } catch (error) {
    
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.deleteUser = async (req,res) =>{
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        res.status(200).json({deletedUser , message: "User has been Deleted"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUser = async (req,res) =>{
    const userId = req.userId;
    const updateFields = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
        res.status(200).json({updatedUser , message : "User profile Updated"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}