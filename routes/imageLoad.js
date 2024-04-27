async function Image(){
    let img=await fetch("https://random.imagecdn.app/500/150")
    if(!img.ok){
        console.log("error");
    }
    let imageblob=await img.blob();
    const imageurl =URL.createObjectURL(imageblob);
    return imageurl;
}

module.exports= Image;