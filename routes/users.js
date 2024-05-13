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
    default:"https://www.shutterstock.com/shutterstock/photos/561472912/display_1500/stock-vector-account-add-contact-create-friend-new-user-icon-561472912.jpg"
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