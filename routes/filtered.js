const express = require("express");
const router = express.Router({mergeParams: true});

const wrapAsync = require('../utils/wrapAsync.js')
const Listing = require('../models/listing.js');

router.get("/",wrapAsync(
    async (req, res) => {
        const { category } = req.query;
        let Lists = await Listing.find({ category: category });
          res.render("listings/index.ejs",{Lists});
}));

module.exports = router;