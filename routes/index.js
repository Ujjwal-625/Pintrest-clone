var express = require('express');
var router = express.Router();
router.use(express.urlencoded({extended:true}));


const userModel=require("./users");
const postModel=require("./post");
const passport=require("passport");
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload=require("./multer");

/* GET home page. */
//handling the routes for uploading the file to the server
router.post("/upload",upload.single("post"),(req,res)=>{
  if(!req.post){
    return res.status(400).send("no files were uploaded");
  }
  res.send("file uploaded succefully");
})


router.get('/', function(req, res, next) {
  res.render('index',{err:req.flash("error")});//same concept as done for login route
});

router.get("/feed",isLoggedIN,(req,res)=>{
  res.render("feed");
})
router.get("/login",(req,res)=>{
 // console.log(req.flash("error"));// now it will show what is the error
 if(req.isAuthenticated()){
  res.redirect("/profile");
 }
  res.render("login",{error: req.flash("error")}); //when we are redirected by adding wrong password then error will be array with something else it will be an empty array
})


router.get("/profile", isLoggedIN,async(req,res)=>{
  const user=await userModel.findOne({
    username:req.session.passport.user  //jab hum login ho jate hai to isme humara username aa jata hai
  })
  res.render("profile",{user:user});
})

router.post("/register",(req,res)=>{
  let obj=new userModel({
    username:req.body.username,
    email:req.body.email,
    fullname:req.body.fullname,
  })

  userModel.register(obj,req.body.password).then(function (){
    passport.authenticate("local")(req,res,()=>{
      res.redirect("/profile");
    })
  })
  .catch(err=>{
    // console.log(err);
    req.flash("error","Username or Email Exist Choose diffrent one");
    res.redirect("/");
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true, //on failiure of login we can show flash messages
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
