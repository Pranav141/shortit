
const jwt = require('jsonwebtoken');
const verifyToken=(data)=>{
    return jwt.verify(data,process.env.JWT_SECRET);
}

module.exports=verifyToken;