const express = require('express');
const router = express.Router();
const model = require('../models/url');
const { restrictTo } = require('../middleware/auth');

router.get('/admin/urls',restrictTo(['ADMINS']), async (req,res)=>{
    const urls = await model.find({});
    return res.render("home", { url: urls });
});

router.get('/', restrictTo(['NORMAL', 'ADMINS']), async (req,res)=>{
    const urls = await model.find({createdBy : req.user._id});
    return res.render("home",{url : urls});
});

router.get('/signup', (req, res) => {
    return res.render('signup');
}); 

router.get('/login',(req,res)=>{
    return res.render('login');
})

module.exports = router;   

