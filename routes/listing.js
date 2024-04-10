const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require('../utils/wrapAsync.js')
const {isLoggedIn,isOwner} = require('../middlewares.js');
const {validateListing} = require("../middlewares.js");
const  listingController = require("../controller/listing.js")

const multer  = require("multer") //to parse the image data
const{storage} = require("../cloudConfig.js")

const upload = multer({storage});  //saving file on the given storage,initialize it

      
    router.route("/")
    .get(wrapAsync(listingController.index))    //all listing route
    .post(isLoggedIn,          //newly updated show list after the posting 
         upload.array("listing[image]", 5), 
         validateListing, //this should come after upload.single..else it will empty and show required listing. 
         wrapAsync(listingController.createListing) 
          );
        

     //new listing route
    router.get("/new",isLoggedIn,listingController.newListingForm)


    router.route("/:id")
    .get(wrapAsync(listingController.showListing))  //show route
    .put(isLoggedIn,                          
                isOwner,
                upload.single("listing[image]"),
                validateListing,    //newly updated list after editing
               wrapAsync(listingController.updatedListing))  
    .delete(isLoggedIn,                     //delete route
            isOwner,
            wrapAsync(listingController.deleteListing));

 
    //edit route
    router.get("/:id/edit",isLoggedIn,
                           isOwner,
                           wrapAsync(listingController.editListingForm));


     module.exports = router;