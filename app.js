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
   


app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to handle form data
app.use(express.urlencoded({ extended: true }));

// Example route to handle a 404 error
app.use((req, res) => {
    res.status(404).render('404'); // Assuming you have a '404' view
  });

  // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error'); // Assuming you have an 'error' view
  });

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
 
     