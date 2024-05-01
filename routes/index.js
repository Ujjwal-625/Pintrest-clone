var express = require('express');
var router = express.Router();
router.use(express.urlencoded({extended:true}));


const userModel=require("./users");
const postModel=require("./post");
const userCollection=require("./collections");
const passport=require("passport");
const localStrategy=require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload=require("./multer");
const upload1=require("./multer2");
const imageLoader=require("./imageLoad");

/* GET home page. */
//handling the routes for uploading the file to the server
router.post("/upload",isLoggedIN,upload.single("post"),async(req,res)=>{
  if(!req.file){
  return res.status(400).send("NO file were uploaded");
  }
  // else{
  //   res.redirect("/profile"); We don't need this to do
  // }
  //now we will link post with user and vice versa
  const user=await userModel.findOne({username:req.session.passport.user})
  const postData=await postModel.create({
    caption:req.body.caption,
    user:user._id,
    image:req.file.filename//it will contain the new uniqu name of the image
  })

  // now we will add post id in post array of user 
  user.post.push(postData._id);
  await user.save();
  console.log("done");
  res.redirect("/profile");
})

router.get('/', function(req, res, next) {
  res.render('index',{err:req.flash("error")});//same concept as done for login route
});

router.get("/loadmore", async (req, res) => {
  try {
      let imgurl = await imageLoader();
      if (imgurl) {
          res.status(200).send(imgurl);
      } else {
          res.status(400).send("something went wrong");
      }
  } catch (error) {
      console.error("Error:", error);
      res.status(500).send("Internal Server Error");
  }
});


router.get("/feed",isLoggedIN,async(req,res)=>{
  //creating an array of image url
  let imgurl=await imageLoader();
  //console.log(imgurl);
//  console.log(Object.keys(imgurl))
//  console.log(Object.values(imgurl))
// for(ele in imgurl){
//   console.log(ele);
//   console.log(imgurl[ele]);
// }
  res.render("feed",{img: imgurl});
  //res.end();
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
  }).populate("post");
  res.render("profile",{user:user});
})

router.post("/register", (req, res) => {
  // Check if all required fields are provided
  if (!req.body.username || !req.body.email || !req.body.fullname || !req.body.password) {
    req.flash("error", "Missing credentials"); // Flash message for missing fields
    return res.redirect("/");
  }

  let obj = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(obj, req.body.password)
    .then(() => {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    })
    .catch(err => {
      req.flash("error", "Username or Email already exists. Please choose a different one.");
      res.redirect("/");
    });
});

//update profile image
router.post("/update",isLoggedIN,upload1.single("dp"),async(req,res)=>{
  if(!req.file){
    return res.status(400).send("No file were uploaded");
  }
  const user=await userModel.findOne({username:req.session.passport.user})
  user.dp="/images/dp/"+req.file.filename;
  await user.save();
  res.redirect("/profile")
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true, //on failiure of login we can show flash messages
}),(req,res)=>{

})


router.get("/images/uploads/:img",isLoggedIN,(req,res)=>{
  console.log("called");
  res.status(200).send("logged in");
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
    console.log("Not logged in");
    res.redirect("/");
  }
}

module.exports = router;
