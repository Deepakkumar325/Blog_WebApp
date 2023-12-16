require('dotenv').config(); 
const express = require("express");
const app = express();
const mongoose  = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const routes = require("./routes/routes")
const filroutes = require('./routes/Fileroutes')
const methodOverride = require('method-override');


// mongodb connection
mongoose.connect(process.env.DB_URL)
.then(()=>console.log("DB connect "))
.catch(()=>{console.log("Failed to connect")})
   

// file views set
const views = path.join(__dirname,'views');
app.set("views",views);
app.set('view engine','ejs');
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// /middleware
app.use(express.static('uploads'))
app.use(methodOverride('_method'))

app.get('/about',(req,res)=>{
    res.render('about')
})

// body-parser , middleware 
app.use(express.urlencoded({ extended: true })); //for form data

app.use(express.json());

app.use(routes);

app.use(filroutes)
   
// routes  


 
const port  = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server listen at port ${port}`);
}) 
 
     