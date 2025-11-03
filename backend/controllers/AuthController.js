// ...existing code...
const userModel = require("../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "user already exist, you can login",
                success: false
            })
        }
        const newUser = new userModel({ name, email, password })
        newUser.password = await bcrypt.hash(password, 10)
        await newUser.save()
        res.status(201).json({
            message: "signed up successfully",
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false
        })
    }
}

const Login = async (req, res) => {
    try {
        const {email, password } = req.body
        const user = await userModel.findOne({ email })
        const errormsg ="auth failed , Email or Password must be wrong"
        if (!user) {
            return res.status(403).json({
                message: errormsg,
                success: false
            })
        }
        const ispasswordcorrect = await bcrypt.compare(password , user.password)
        if(!ispasswordcorrect){
             return res.status(403).json({
            message: errormsg,
            success: false
        })
        }
        const jwtToken =  jwt.sign(
            {email : user.email , _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn : '24h'}
        )
            res.status(200).json({
                message:"login successful",
                success:true,
                jwtToken,
                email,
                name:user.name
            })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            success: false
        })
    }
}
module.exports = {
    SignUp,
    Login
}
// ...existing code...