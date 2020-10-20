// Import the express library in this file
const express = require('express');
// Assign to server the express library
const server = express();


server.set('view engine', 'ejs')

// Import dotenv
const dotenv = require("dotenv");
dotenv.config();

// Import body-parser
const bodyParser = require('body-parser');

// Import cors
const cors = require('cors');

//Import passport

const passport = require("passport");
const initPassportStrategy = require("./config/passport");
initPassportStrategy(passport);

// Import cloudinary
const cloudinary = require('cloudinary');
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)
// Import express-form-data
const expressFormData = require('express-form-data');


// Import mongoose (for connecting MongoDB)
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/ProductRoutes');
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require('./routes/PostRoutes')

//const dbURL = "mongodb+srv://emad:emad@cluster0.hqtag.mongodb.net/users?retryWrites=true&w=majority";
const dbURL = process.env.DB_URL;

mongoose
    .connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true})
    // for successful promise
    .then( 
        ()=>{
            console.log('Connected to MongoDB')
        } 
    )
    // for failed promise
    .catch(
        (e)=> {
            console.log('an error occured', e)
        }
    );

server.use(bodyParser.urlencoded( {extended: false} ));
server.use(bodyParser.json());
server.use(cors());
server.use(passport.initialize());
server.use(expressFormData.parse());

server.get(
    //1st argument
    '/',
    //2nd argument
    (req, res)=>{
        const theHTML = "<h1>Welcome to My App</h1>";
        res.send(theHTML);
    }
);



server.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send(
        `<h1>Your Profile</h1> 
      <p>Your first name:   ${req.user.firstName} </p> 
      <p>Your last name:   ${req.user.lastName}  </p>`
      );
    }
  );
  
  server.get(
    "/settings",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.send(
        `<h1>Account settings</h1>
      <p>Name: ${req.user.firstName}</p>
      <p>Email: ${req.user.email}</p>
      `
      );
    }
  );
  

server.use(
    '/products',
    ProductRoutes
)
server.use("/users", UserRoutes);

server.use("/posts", PostRoutes)


server.get(
    '/404',
    (req, res) => {
        res.send("<h1>404<h1>");
    }
);

server.get(
    '*',
    (req, res) => {
       res.redirect('/404')
    }
);

server.listen(
    // port number
    process.env.PORT || 3002, 
    // callback when (and if) the connection is OK
    () => {
        console.log('Your server is now running http://localhost:3002/')
    }
)