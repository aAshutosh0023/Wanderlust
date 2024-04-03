const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require('../utils/wrapAsync.js')
const Listing = require('../models/listing.js');
const {searchLists} = require("../searchLists.js");

router.get("/",wrapAsync(
    async(req,res)=>{
        let List = await Listing.find({});
       
        const {userQuery} = req.query;
      
          let  resultLists =  searchLists(List,userQuery);
        
          const flatLists = resultLists.map(result => result.item);

      res.render("listings/index.ejs", { Lists: flatLists });
}));
module.exports = router;