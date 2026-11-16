const jwt = require('jsonwebtoken');
const secret = "kayu$@123$";

function setuser(user){
    return jwt.sign({
        _id : user._id,
        email: user.email,
        role: user.role,
    },secret);
}

function getuser(token){
    if(!token){
        return null;
    }
    try{
        return jwt.verify(token,secret);
    }
    catch(error){
        console.log("Error",error);
        return null;
    } 
}

module.exports = {setuser,getuser};   