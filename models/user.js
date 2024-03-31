const mongoose = require("mongoose");
const passport = require("passport");

const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
    },
});  //no need to add username and password..by default will be add by the passportLocalMongoose plugin that we are using.

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);