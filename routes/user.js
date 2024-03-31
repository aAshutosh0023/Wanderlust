const express = require("express");
const router = express.Router({mergeParams: true});


const wrapAsync = require('../utils/wrapAsync.js');

const passport = require("passport");

const {saveRedirectUrl} = require("../middlewares.js");

const userController = require("../controller/user.js")


  router.route("/signup")
  .get(userController.signupForm)  //signup form
  .post(wrapAsync(userController.signup))  //signup
  

 
 
  router.route("/login")
  .get(userController.loginForm)   //for login form
  .post(saveRedirectUrl,       //login
       passport.authenticate("local",{  //passport middleware ...yeh khud details check krega..sahi hui toh aage jane dega..nhi toh error dega or wahi rok dega.
         failureRedirect: "/login",
         failureFlash: true,
       
    }),userController.logIn);



    //for logout
    //there exist inbulid req.logout method in the passport.

    //refernece: https://www.passportjs.org/concepts/authentication/logout/
   
    router.get("/logout",userController.logOut);
  
    
  module.exports = router;