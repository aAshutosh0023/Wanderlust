const User = require("../models/user.js");

//signup form
module.exports.signupForm=(req,res)=>{ res.render("users/signup.ejs");
}


//signup
module.exports.signup=async(req,res)=>{
    try{ let{username,email,password}= req.body
    const newUser =  new User({email,username});

   const registedUser =  await User.register(newUser,password);
     
          //sign up krte e user auto login ho jaye..
        req.login(registedUser,(err)=> { 
          if (err) 
          {
          return next(err);
             }
          req.flash("successMsg","Welcome to wanderlust");
          res.redirect("/listings");
      } );
     
  }
    catch(error){
        req.flash("errorMsg",error.message);
        res.redirect("/signup");
    }       
  }

 //login form
  module.exports.loginForm =(req,res)=>{
    res.render("users/login.ejs");
}

//login
   module.exports.logIn = async(req,res)=>{
       req.flash("successMsg","Welcome back to wanderlust");
        if(res.locals.redirectUrl){ //agar redirect path khali nhi aaya toh ..
         return res.redirect(res.locals.redirectUrl);
        }
       res.redirect("/listings");  
        //nahi toh listings par jana..
                               /* or you can write
       let redirectUrl = res.locals.redirectUrl || "/listings"; 

       res.redirect(redirectUrl);*/
   }

//logout
   module.exports.logOut=(req,res)=>{
    req.logout((err)=> { 
      if (err) 
      {
      return next(err);
         }
         req.flash("successMsg","Successfully logged you out!")
      res.redirect("/listings");
    } );
  }