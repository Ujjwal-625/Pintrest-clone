const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrest-clone");

const CollectionSchema =mongoose.Schema({
    img:{
        type:String
    },
    caption:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("usercollection",CollectionSchema)