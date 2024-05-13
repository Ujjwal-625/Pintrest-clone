const img=document.querySelectorAll(".box");
img.forEach(image => {
   const caption= image.firstElementChild.nextElementSibling;
   const id=image.id;
    const addbtn=document.createElement("button");
    const imgbtn=document.createElement("button");
    addbtn.classList="addbtn";
    imgbtn.classList="addbtn";
    addbtn.innerText="Remove from collection";
    imgbtn.innerText="Open image";
    image.addEventListener('mouseenter', () => {
        image.appendChild(addbtn);
        image.appendChild(imgbtn);
    });

    image.addEventListener('mouseleave', () => {
        addbtn.remove();
        imgbtn.remove();
        // console.log(image);
    });
    addbtn.addEventListener("click",async()=>{
        try{
        const res=await fetch("/removeCollection",{
            method:"delete",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id:id
            })
        })
        // console.log(res.status);
        if (res.redirected) {
            window.location.href = res.url;
        }
    }
    catch(err){
        console.log(err)
    }
    })
    imgbtn.addEventListener("click",()=>{
        window.open(image.firstElementChild.getAttribute("src"));
    });
});