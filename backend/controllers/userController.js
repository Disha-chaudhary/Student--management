const User = require("../models/User");

const registerUser = async (req,res)=>{
    try{
        const{name,email,password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details"
            });
        }

        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(400).json({
                success:false,
                message:"this user already exists"
            });
        }
        //create user

        const user = await User.create({
            name,
            email,
            password,
        });
        res.status(200).json({
            success:true,
            message:"user registered successfully!!",
            user,
        });
       }
       catch(error){
        console.log(error);

        res.status(500).json({
            success:false,
            message:"internal server error occured!!",
        });
       }

};

module.exports = registerUser;