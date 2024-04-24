const btn=document.getElementById("update-btn");

btn.addEventListener("click",updateImage);

function updateImage(){
    const inputFile=document.getElementById("dp");
    inputFile.click();
    inputFile.addEventListener("change",()=>{
        document.getElementById("dpform").submit();
    })
}

