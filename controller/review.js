const Review = require('../models/review.js');

const Listing = require('../models/listing.js');


//post review
module.exports.postReview =async(req,res)=>{
    
    let listing = await Listing.findById(req.params.id); //kha daalna hai..

    let newReview = new Review(req.body.review);  //kya daalna
      newReview.author = req.user._id;
   
    
   listing.reviews.push(newReview);  //db m particular id wale listing m review daal diya..

await newReview.save();
await listing.save();

req.flash("successMsg","Review Posted Sucessfully..");

res.redirect(`/listings/${listing.id}`);

}

//delete the review

module.exports.deleteReview = async(req,res)=>{

    let {id,reviewId} = req.params;
    
    await Listing.findByIdAndUpdate(id,{$pull:{reviews: reviewId}});

   await Review.findByIdAndDelete(reviewId);

   req.flash("successMsg","Review Deleted Sucessfully..");

   res.redirect(`/listings/${id}`)
}