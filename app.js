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
mongoose.connect(process.env.DB_URL,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000})
.then(()=>console.log("DB connect "))
.catch(()=>{console.log("Failed to connect")})
   



// Require static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('views', '/opt/render/project/src/views');

// Set view engine as EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
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
 
     