const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req,res)=>{
    try{
        const{name,email,password}= req.body;
      

        if(!name || !email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill all the details"
            });
        }
          const hashedPassword = await bcrypt.hash(password,10);

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
            password: hashedPassword,
        });
        res.status(201).json({
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


const loginUser = async (req, res) => {
    try {
        // 1. Get email and password from request body
        const { email, password } = req.body;

        // 2. Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }

        // 3. Check if user exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        // 4. Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // 5. Generate JWT Token
        const token = jwt.sign(
            {
                id: existingUser._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // 6. Send success response
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = {registerUser,loginUser};