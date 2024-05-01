const btn=document.getElementById("update-btn");

btn.addEventListener("click",updateImage);

function updateImage(){
    const inputFile=document.getElementById("dp");
    inputFile.click();
    inputFile.addEventListener("change",()=>{
        document.getElementById("dpform").submit();
    })
}

async function showimage(img){
    // window.location.href="localhost:3000"+img;
    let res=await fetch(img);
    console.log(res.status);
    if(res.status==200)
    window.location.href=res.url;
    else 
    window.location.href="localhost:3000/login";
}
