const express = require('express');
const shorturl = require('./routes/url');
const { connectdb } = require('./connections');
const model = require('./models/url');
const path = require('path');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/user');
const {handleAuthentication,restrictTo} = require('./middleware/auth');
const cookieparser = require('cookie-parser');

const app = express();
const PORT = 8001;
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieparser());
app.use(handleAuthentication);

connectdb('mongodb://127.0.0.1:27017/url-shortner')
.then((req,res)=>console.log("Mongoose is connected"))
.catch((err)=>{console.log("Error:",err)});

app.set("view engine","ejs");
app.set("views",path.resolve('./views'));

app.use('/api/url', restrictTo(['NORMAL', 'ADMINS']),shorturl); 
app.use('/api/user',userRoute);
app.use('/', staticRoute);


app.listen(PORT,()=>console.log(`Server is running at PORT ${PORT}`));  