const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Review = require("./review") //we import our review model ..taaki jab list delete kre to review bhi delete ho ske.

let listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "Not available"
    },
 

    image:[{
        url:  { type: String,
          },
        filename: String,
        }],

    price: {
        type: Number,
        required: true,
        min: 1
    },
    location: {
        type: String
    },
    country: {
        type: String
    },
    reviews:[
        {
         type: Schema.Types.ObjectId,   //to associate it with listing
         ref: "Review"
        }
    ],

    owner:{
        type: Schema.Types.ObjectId, 
        ref: "User"
    },
    geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
      category: {
        type: String,
        enum: ['trending','iconic_cities','rooms','boats','arctic','camping','beach', 'castle','farms','mountains','domes'],
        required: false
    },

      });
      




listingSchema.post("findOneAndDelete",async(listing)=>{

    if(listing)
    {let result= await Review.deleteMany({_id:{$in:listing.reviews}});
    console.log(result);
}
  
   
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
