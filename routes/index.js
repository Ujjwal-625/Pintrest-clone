var express = require('express');
var router = express.Router();


const userModel=require("./users");
const postModel=require("./post");
const passport=require("passport");
const localStrategy=require("passport-local");
passport.authenticate(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/profile", isLoggedIN,(req,res)=>{
  res.send("welcome to Profile");
})

router.post("/register",(req,res)=>{
  let obj=new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
  })

  userModel.register(obj,req.body.password).then(function (){
    password.authenticate("local")(req,res,()=>{
      res.redirect("/profile");
    })
  })
})

router.post("/login",passport.authenticate("loacl",{
  successRedirect:"/profile",
  failureRedirect:"/"
}),(req,res)=>{

})

router.get('/logout',(req,res,next)=>{
  req.logOut(function(err){
    if(err){
      return next(err);
    }else{
      res.redirect("/");
    }
  })
})

function isLoggedIN(req,res,next){
  if(req.isAuthenticated()){
    next();
  }
  else{
    res.redirect("/");
  }
}

module.exports = router;
