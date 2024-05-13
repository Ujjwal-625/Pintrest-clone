//adding hoverring button to images

const img=document.querySelectorAll(".box");
img.forEach(image => {
   const caption= image.firstElementChild.nextElementSibling;
   //console.log(caption);
    const addbtn=document.createElement("button");
    const imgbtn=document.createElement("button");
    addbtn.classList="addbtn";
    imgbtn.classList="addbtn";
    addbtn.innerText="Add To collection";
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
            const res=await fetch("/addCollection",{
                method:"Post",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({src:image.firstElementChild.getAttribute("src"),
                    caption:caption.innerText
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
});

window.onload=()=>{
    Addbtn();
}

const div=document.getElementById("btndiv");
const imgdiv=document.querySelector(".container");
const btn =document.createElement("button");
function Addbtn(){
    btn.classList="btn btn-danger";
    btn.innerText="Load More";
    div.appendChild(btn);
}

btn.addEventListener("click",async()=>{
    let res=await fetch("/loadmore");
    let arr=await res.json();
    //console.log(arr);
    div.removeChild(btn);
    Addimage(arr);
    div.appendChild(btn);
   // console.log(img);
})

function Addimage(arr){
    arr.forEach((ele)=>{
        const div = document.createElement("div");
        div.classList="box";
        const img =document.createElement("img");
        img.src=ele.download_url;
        img.alt="Somthing went wrong";
        
        const caption=document.createElement("div");
        caption.classList="caption";
        caption.innerText=ele.author;
        // caption.style.textDecoration="none";
        div.appendChild(img);
        div.appendChild(caption);
        imgdiv.appendChild(div);

    const addbtn=document.createElement("button");
    const imgbtn=document.createElement("button");
    addbtn.classList="addbtn";
    imgbtn.classList="addbtn";
    addbtn.innerText="Add To collection";
    imgbtn.innerText="Open image";
    div.addEventListener('mouseenter', () => {
        div.appendChild(addbtn);
        div.appendChild(imgbtn);
        // console.log(image);
    });
    div.addEventListener('mouseleave', () => {
        addbtn.remove();
        imgbtn.remove();
        // console.log(image);
    });
    addbtn.addEventListener("click",async()=>{
        const res=await fetch("/addCollection",{
            method:"Post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({src:img.getAttribute("src"),
                caption:caption.innerText
            })
        })
        console.log(res.status);
    })
    imgbtn.addEventListener("click",()=>{
        window.open(img.getAttribute("src"));
    })
    })
}
