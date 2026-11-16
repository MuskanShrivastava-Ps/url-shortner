const urlmodel = require('../models/url');
const {nanoid} = require('nanoid');
const usermodel = require('../models/user');
const {v4 : uuidv4} = require('uuid');
const {setuser,getuser} = require('../service/user');

async function handleUrlShortner(req,res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ msg : "url is required"});
    }
    const shortId = nanoid(8);
        const result = await urlmodel.create({
            shortId: shortId,
            redirectUrl: body.url,
            viewHistory: [],
            createdBy: req.user._id,
        });
    console.log(result);
    return res.render("home",{
        id : shortId
    })
} 

async function handleRedirectToUrl(req,res){
    const shortId = req.params.shortId;
    const entry = await urlmodel.findOneAndUpdate({shortId}, {$push:{ viewHistory : {timestamp: Date.now()}}});
    return res.redirect(entry.redirectUrl);
}

async function handleClick(req,res){
    const shortId = req.params.shortId;
    const result = await urlmodel.findOne({shortId});
    return res.status(200).json({
        Clicks: result.viewHistory.length,
        Analytics: result.viewHistory,
    })
}

async function handleSignUpUser(req,res){
    const {name, email, password} = req.body;
    await usermodel.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
} 

async function handleLoginUser(req,res){
    const {email,password} = req.body;
    const user = await usermodel.findOne({email,password});
    if(!user){
       return res.render('login',{
            error : "Invalid password or email"
       });
    }
    
    const token = setuser(user);
    res.cookie("token",token);
    return res.redirect('/');
}

module.exports = { handleUrlShortner, handleRedirectToUrl, handleClick, handleSignUpUser, handleLoginUser };    

