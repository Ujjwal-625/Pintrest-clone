const multer=require("multer");
const {v4: uuidv4}=require("uuid");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/images/uploads');
    },
    filename:function(req,file,cb){
        const UniqueFilename=uuidv4();
        let ext=file.mimetype.split('/')[1];
        // console.log(file);
        // console.log(ext);
        cb(null,UniqueFilename+"."+ext);
    }
})

const upload=multer({storage:storage});

module.exports=upload;