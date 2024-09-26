// const router=require("express").Router();

const verifyToken = require("../util/verifyToken");

const auth=(req,res,next)=>{
    const token = req.headers?.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).send({message:"Access Denied"});
    }
    try {
        const decoded=verifyToken(token);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(400).send({message:"Invalid Token"});
    }
}

module.exports=auth;