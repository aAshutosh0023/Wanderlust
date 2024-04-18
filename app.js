if(process.env.Node_ENV != "production"){
  require('dotenv').config();
}

 let express = require("express")
 let app = express();
 
 const ejsMate = require('ejs-mate');    //for the boilerplate..
 var methodOverride = require('method-override')
 const mongoose = require("mongoose");
 
 const expressError = require('./utils/expressError.js')
 const path = require("path"); 
 
 
 

 const listingsRouter = require("./routes/listing.js")
 const reviewsRouter = require("./routes/review.js")
 const userRouter = require("./routes/user.js")
 const filterRouter = require("./routes/filtered.js")
 const searchRouter =  require("./routes/search.js")
 


 const session =require("express-session");  // only server-side session storage
 const MongoStore = require('connect-mongo'); //we will use it for session store .(production level) .
 const flash = require("connect-flash");

 const passport = require("passport");
 const LocalStrategy = require("passport-local");
 const User = require("./models/user.js");

const { constants } = require("buffer"); 

 app.use(methodOverride("_method"));

 app.set("view engine","ejs");

 app.engine("ejs",ejsMate)

 app.use(express.urlencoded({extended: true}));
 
 app.set("views",path.join(__dirname,"views")); 

 app.use(express.static(path.join(__dirname,"/public")));

 const dbUrl = process.env.ATLASDB_URL ;
 const sessionKey = process.env.SESSION_KEY;
 const mongoUrl ='mongodb://127.0.0.1:27017/wanderlust'

 const store = MongoStore.create({ mongoUrl: dbUrl ,
 crypto: {
   secret: sessionKey
 },
 touchAfter : 24*3600  //agar user ne interact ni kiya toh 24 hr k baad e session refresh krna...

});

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err);
});


 const sessionOptions ={secret: sessionKey,
                         store,
                        resave: false,
                        saveUninitialized: true ,
                        cookie:{
                   expires:Date.now() + 7 *24* 60 * 60 *1000,  //aaj se 7 din baad..(in milisecond)
                          maxAge: 7 *24* 60 * 60 *1000,
                          httpOnly: true,
                        }
                      
                      };

  main()
   .then((res)=>{
     console.log("connected sucessfully");
   })
   .catch((err)=>{
     console.log(err);
   })

   async function main(){
    await mongoose.connect(dbUrl);
 }
 

     app.use(session(sessionOptions));
     app.use(flash());

     app.use(passport.initialize()); //intialize it to use....we pass as middlewares
     app.use(passport.session()); //so that website can know..it is the same user that trying to accesst the different pages of the same website.

     passport .use(new LocalStrategy(User.authenticate()));   //use locatstrategy that we define and authicate method use hoga to authicate user...


     passport.serializeUser(User.serializeUser());  //to store the information related to user.
     passport.deserializeUser(User.deserializeUser());  //to remove the information of the user after the session over.

   app.use((req,res,next)=>{
    //https://expressjs.com/en/5x/api.html#res.locals
    //using res.locals we can use currentUser in html without rendering.

    res.locals.successMsg =  req.flash("successMsg");
    res.locals.errorMsg = req.flash("errorMsg");
    res.locals.currentUser = req.user; 
    
    next();
  })
       
        app.get("/",(req,res)=>{
              res.redirect("/listings");
        })
  
        app.use("/listings",listingsRouter);
        app.use("/listings/:id/reviews",reviewsRouter);
        app.use("/",userRouter);
        app.use("/filtered",filterRouter);
        app.use("/searchResults",searchRouter);

   
         




  //we use next for it kyuki wrapAsync use ni kiya ,kyuki yeh async nhi hai.
    app.all("*",(req,res,next)=>{
         next(new expressError(404,"page not found!"));
    })

        app.use((err,req,res,next)=>{
          let {statusCode=500, message="something wrong occured!!"} = err;
            //res.status(statusCode).send(message);
           res.status(statusCode).render("error.ejs",{message});
        })

  app.listen(8080,()=>{
      console.log("server start");
  })

  
