const {getuser} = require('../service/user');

function handleAuthentication(req,res,next){
    // const headerValue = req.header("authorization");
    const tokencookie = req.cookies?.token;
    
    if(!tokencookie){
        return next();
    }

    // const token = headerValue.split(" ")[1];

    const user = getuser(tokencookie);
    req.user = user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user){
            return res.redirect('/login');
        }
        if(!roles.includes(req.user.role)){ 
            return res.end("Unauthorized");
        }
        return next();
    }
}

module.exports = { handleAuthentication, restrictTo };     