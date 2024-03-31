 //wrapAsync function
 //we use this function taaki baar baar har async route k liye try catch na krna pde....sidha iska use le lenge.....

module.exports = function wrapAsync(fn){
               
      return function(req,res,next){
     fn(req,res,next).catch(next);
     
    }
}