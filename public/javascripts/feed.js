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
})

function Addimage(arr){
    arr.forEach((ele)=>{
        const div = document.createElement("a");
        div.style.textDecoration="none";
        div.classList="box";
        div.href=ele.download_url;
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
    })
}
