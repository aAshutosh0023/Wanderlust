const Listing = require('../models/listing.js');
const {mapApi} = require("./mapApi.js");
 //all listing 

 
module.exports.index=async(req,res)=>{
  
    let allLists = await Listing.find({});

    res.render("listings/index.ejs",{allLists});

}

 //new listing 
module.exports.newListingForm=(req,res)=>{
    res.render("listings/new.ejs");
}


 //newly updated show list after the posting 
module.exports.createListing=async(req,res,next)=>{
      let url = req.file.path;
     let filename = req.file.filename;
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user.id; //save owner details

    newListing.image = {url,filename};

    const searchQuery =`${newListing.title},${newListing.location},${newListing.country}`
    
    console.log(searchQuery);
    let dataArr = await mapApi(searchQuery);

    const apiData = {
        type: 'Point',
        coordinates: [dataArr[1], dataArr[0]] //geojson has logitute first.
    };

       newListing.geometry = apiData;

        await newListing.save();

        console.log(newListing);
        
        req.flash("successMsg","you have been sucessfully listed.");
      
         res.redirect("/listings"); 

}

 //show 
 module.exports.showListing= async(req,res)=>{
    let {id}= req.params;

    const list = await Listing.findById(id)
    .populate({path:"reviews",
    populate:{
     path:"author",
    },
   })
    .populate("owner");

    if(!list){
  req.flash("errorMsg","The list for which you are looking for, Does not Exist."); 
  res.redirect("/listings");
    }

     /* ****************************** 
    const searchQuery =`${list.title},${list.location},${list.country}`
    
    let dataArr = await mapApi(searchQuery);

    const apiData = {
        coordinates: [dataArr[1], dataArr[0]]
    };
    
    console.log(apiData);   
 ******************************************** */
        res.render("listings/show.ejs",{list});
      }

 //edit 
     module.exports.editListingForm = async(req,res)=>{
        let {id} = req.params;
       const list = await Listing.findById(id);

       if(!list){
        req.flash("errorMsg","The list that you want to update, Does not Exist.")
        res.redirect("/listings");
       } 

       let originalImageUrl = list.image.url; 
       originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250"); 
        res.render("listings/edit.ejs",{list,originalImageUrl});
}

 //newly updated list after editing
module.exports.updatedListing =async (req,res)=>{  
    let {id} = req.params;
   let updatedList = req.body.listing;//req.body se image ni ayegii.only text data ayega

   if(typeof req.file !=="undefined"){
   let url = req.file.path;
   let filename = req.file.filename;

   updatedList.image = {url,filename}; } //put url and filename in the updatedlist.image

 await  Listing.findByIdAndUpdate(id,{...updatedList}) ; 
 req.flash("successMsg","you have been sucessfully updated.");

 res.redirect(`/listings/${id}`); 
}


 //delete route
module.exports.deleteListing =async(req,res)=>{
    let {id}= req.params;
   
   await Listing.findByIdAndDelete(id);
   req.flash("successMsg","you have been sucessfully deleted.");

    res.redirect("/listings");
}