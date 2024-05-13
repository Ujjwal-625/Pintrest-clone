const mongoose =require("mongoose");

const plm=require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pintrest-clone");

const userSchema=mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  dp:{
    type:String,
    default:"https://imgs.search.brave.com/gV6Xy99WsNTWpgT2KUNxopKhP45u8QMrrL2DGi5HYxg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzE1Lzg0LzQz/LzM2MF9GXzIxNTg0/NDMyNV90dFg5WWlJ/SXllYVI3TmU2RWFM/TGpNQW15NEd2UEM2/OS5qcGc",
  },
  fullname:{
    type:String,
    required:true,
  },
  post:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }],
  userCollections:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"usercollection"
  }]
})

userSchema.plugin(plm);
module.exports=mongoose.model("User",userSchema);