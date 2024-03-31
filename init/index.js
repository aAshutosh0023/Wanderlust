const mongoose = require("mongoose");
 const Listing = require('../models/listing.js');
 const initData = require('./data.js')


    async function main(){
     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
  }
  
  main()
   .then((res)=>{
     console.log("connected sucessfully");
   })
   .catch((err)=>{
     console.log(err);
   })
  
   const initDB = async ()=>{
   await  Listing.deleteMany({}); //khali krdena
   await  Listing.insertMany(initData.data);  //dubara sab daalna
   await Listing.updateMany({}, {$set: {owner:"6602217e9410d47733099b6d"}})  //owner wala field daal do..
}
   

initDB();