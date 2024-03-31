//..same code ko alg alg  har route k liye likhne se better hota hai...middleware bna do or call krlo....but app.js file me woh saare middleware hai jo,multiple routes m use ho rhe...so hum middleware k liye alag se dedicated file bna rhe hai...yaha se call kr lenge..

  //middle to authenticate user to create listing ,editing etc

  const Listing = require('./models/listing.js');
  const Review = require('./models/review.js');
  const {listingSchema} = require('./schema.js');  //using joi package that we import in schema.js
  const {reviewSchema} = require('./schema.js');  //using joi package that we import in schema.js
 

  const expressError = require('./utils/expressError.js')


   module.exports.isLoggedIn=(req,res,next)=> {
   
    if(!req.isAuthenticated()){
     // console.log(req.originalUrl) //here in req,all the info of user stored.
      req.session.redirectUrl = req.originalUrl;  //jaha user jana tha usko save krege..taaki login krwakr redirect kr ske,isliye session m store kiya.

      req.flash("errorMsg","You must be logged in to do this operation.")
         return res.redirect("/login");  
       
  }
    next();
  
  };

    module.exports.saveRedirectUrl=(req,res,next)=>{
      if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }  //we store the req.session.redirect in tht req.local so that we can use it even after login..kyuki login krte e hai...stored url remove ho jati but req.locals m store kri toh nhii hogii...and we will require it there.,so we make it as a middleware function. 
    next();
  }


    //to authorized the user..
  module.exports.isOwner= async (req,res,next)=>{
    let {id} = req.params;              
    let listing=  await Listing.findById(id);  //here it is id of listing..
    
    if(!listing.owner.equals(res.locals.currentUser._id))
    {
       req.flash("errorMsg","You don't have permission. ")
   return res.redirect(`/listings/${id}`);
    } 
    next();
  };

   
  



   //validateListing function
   module.exports.validateListing = (req,res,next)=>{
    let {error} =listingSchema.validate(req.body)
          if(error){
            let errMsg = error.details.map((el)=>el.message).join(",");  //just to pass error message we wrote this line. we can directly pass error too instead of message,but message looks good to user.
            throw new expressError(400,errMsg);
          } 
          else{
            next();
          }
      }
      //validate Review middleware
  
     module.exports.validateReview = (req,res,next)=>{
        let {error} =reviewSchema.validate(req.body)
            
          
              if(error){
               
                let errMsg = error.details.map((el)=>el.message).join(",");
                throw new expressError(400,errMsg);
               
              } 
             
              else{
                next();
              }
          };
      
           //to authorized the review author...review ka author verify krege..
    module.exports.isReviewAuthor= async (req,res,next)=>{
      let {id,reviewId} = req.params;              
      let review=  await Review.findById(reviewId);  //here it is id of listing..
      
      if(!review.author.equals(res.locals.currentUser._id))
      {
         req.flash("errorMsg","You are not the author of these review. ")
     return res.redirect(`/listings/${id}`);
      } 
      next();
    };