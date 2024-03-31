const express = require("express");
const router = express.Router({mergeParams: true});
 

 const wrapAsync = require('../utils/wrapAsync.js')
 
 const reviewController = require("../controller/review.js")

   const {validateReview} = require("../middlewares.js");

   const {isLoggedIn,isOwner,isReviewAuthor} = require('../middlewares.js');


   //review route

  router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.postReview) )


//delete review route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview))
 
    module.exports = router;