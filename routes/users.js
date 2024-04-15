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
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  dp:{
    type:String,
  },
  fullname:{
    type:String,
    required:true,
  },
  post:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }]
})

userSchema.plugin(plm);
module.exports=mongoose.model("User",userSchema);