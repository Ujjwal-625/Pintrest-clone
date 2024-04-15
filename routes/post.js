const mongoose=require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrest-clone");

const postSchema=mongoose.Schema({
    postData:{
        type:String,
        required:true,
    },
    like:{
        type:Array,//we will store the id of the user who liked the post
        default:[],
    },
    postDate:{
        type:Date,
        default:Date.now,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }
})

module.exports=mongoose.model("Post",postSchema);