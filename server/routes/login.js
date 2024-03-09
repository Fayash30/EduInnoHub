const bcrypt = require('bcrypt');
const dbpost = require('../models/UserAcc');
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    
      const { email, password } = req.body;

      const user = await dbpost.findOne({  email: email  });

      if (!user) {
       
        return res.json({ status : 'error' ,user:false , message : 'Email does not exist'})
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        
      
      
      const token = jwt.sign({
        email: user.email,
        userId: user._id,
        user_name : user.user_name
      }, 'privatesecret321',{ expiresIn: '1h' })

      return res.json({status : 'ok' , user: token});
    }
      else 
      {
        return res.json({
          status:'error' , user:false , message:"Password is Wrong"
        })
      }  
    
  };

