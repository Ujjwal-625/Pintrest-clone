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

function Addpost (){
    window.location.href="/postform";
}
const imgdiv=document.querySelectorAll(".card");
imgdiv.forEach(image => {
     const addbtn=document.createElement("button");
     const imgbtn=document.createElement("button");
     const updbtn=document.createElement("button");
     addbtn.classList="addbtn";
     imgbtn.classList="addbtn";
     updbtn.classList="addbtn";
     addbtn.innerText="Remove Post";
     imgbtn.innerText="Open Post";
     updbtn.innerText="Update Post";
     image.addEventListener('mouseenter', () => {
         image.appendChild(addbtn);
         image.appendChild(imgbtn);
         image.appendChild(updbtn);
     });
 
     image.addEventListener('mouseleave', () => {
         addbtn.remove();
         imgbtn.remove();
         updbtn.remove();
         // console.log(image);
     });
     addbtn.addEventListener("click",async()=>{
         try{
             const res=await fetch("/deletePost",{
                 method:"Delete",
                 headers:{
                     "content-type":"application/json"
                 },
                 body:JSON.stringify({
                    id:image.id
                 })
             })
             // console.log(res.status);
             if (res.redirected) {
                 window.location.href = res.url;
             }
         }
         catch(err){
             console.log(err);
         }
     })
     imgbtn.addEventListener("click",()=>{
         window.open(image.firstElementChild.getAttribute("src"));
     });
     updbtn.addEventListener("click",()=>{
        const id=image.id;
       window.location.href=`/updatepost?id=${id}`;
     })
 });
