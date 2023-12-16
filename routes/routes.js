const express = require('express');
const router = express.Router();
const multer = require('multer');
const model = require('../model/mongo')
const fs = require('fs');
const method = require('method-override');


//img upload
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads')
   }, filename: function (req, file, cb) {
      cb(null, file.fieldname + "_" + Date.now() + "_" + file.filename);
   },
})

const upload = multer({
   storage: storage,
}).single("image");


router.get('/add', (req, res) => {

   res.render('adduser', { title: 'adduser' });
})



// Get all user route find all data
router.get('/', async (req, res) => {
   const users = await model.find({});
   res.render("index", { title: "Home Page", users });
})

// edit database
router.get('/edit/:id', async (req, res) => {
   const id = req.params.id;
   const users = await model.findById(id);
   res.render('edituser', { title: "edit Page", users });
})


router.get('/post/:id', async (req, res) => {
   try {
       const postId = req.params.id;
       const post = await model.findById(postId);
       if (!post) {
           return res.status(404).render('error', { message: 'Post not found' });
       }

       res.render('viewpost', { post });
   } catch (error) {
       console.error(error);
       res.status(500).render('error', { message: 'Internal Server Error' });
   }
});

router.get('/contact',(req,res)=>{
   res.render('conatct')
})

router.post('/submit-contact', (req, res) => {
   const { name, email, message } = req.body;

   // Here, you can store the data in a database or any other storage mechanism
   // For simplicity, we'll just log the data to the console
   console.log('Received contact form submission:');
   console.log('Name:', name);
   console.log('Email:', email);
   console.log('Message:', message);

   // Send a JSON response indicating success
   res.json({ success: true, message: 'Form submitted successfully!' });
});

// update user data
router.patch('/update/:id', upload, async(req, res) => {
      
   await  model.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename
   } )
   res.redirect("/");
})



// delete the user details
router.get('/delete/:id', async (req, res) => {
   const id = req.params.id;
   await model.findByIdAndDelete(id);
   res.redirect('/');
})
 
 

// Insert an User data
router.post('/add', upload, (req, res) => {
   const user = new model({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename, 
   })

   user.save().then(() => {
      res.redirect("/");
   }).catch((err) => {
      console.log(err)
   })
}) 


module.exports = router;