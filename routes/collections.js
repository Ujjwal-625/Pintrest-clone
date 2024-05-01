const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/pintrest-clone");

const collectionSchema=mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    img:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports=mongoose.model("userCollection",collectionSchema);