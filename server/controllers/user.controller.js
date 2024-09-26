const express = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');
const verifyToken = require('../util/verifyToken');

// const { Error } = require('mongoose');
const  jwt  = require('jsonwebtoken');
const saltRounds = 10;
exports.register = async (req, res) => {
    const { name, email, password } = req.body;    
    try {
        const user = await User.findOne({ email: email })
        if (user) {
            return res.status(400).send({message:"Email already exists"})
        }
        else {
            bcrypt.hash(password, saltRounds, async function (err, hash) {
                const newUser = new User({ name, email, password: hash })
                let data = await newUser.save();
                data.password = undefined;
                let token = generateToken(data.toJSON());
                return res.status(200).send({ message: "User registered Successfully", userInfo: data, token: token });
            }); 
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error });
    }
}

exports.login = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email});
        if(user){
            const result=await bcrypt.compare(password,user.password)
            if(result){
                user.password=undefined
                const token=generateToken(user.toJSON());
                return res.status(200).send({message:"Logged In Successfully",userInfo:user.toJSON(),token:token});
            }
            else{
                return res.status(400).send({message:"Incorrect Password"});
            }
        }
        else{
            return res.status(400).send({message:"Email not Registered"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({message:error});
    }
} 

exports.verify= async(req,res)=>{
    const token=req?.headers?.authorization?.split(" ")[1];
    if(!token){
        return res.status(400).send({message:"Token not found"});
    }
    if(verifyToken(token)){
        return res.status(200).send({userInfo:jwt.decode(token,process.env.JWT_SECRET)});
    }
    return res.status(400).send({message:"Invalid Token!!"});
}
  