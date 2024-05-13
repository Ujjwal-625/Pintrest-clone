//adding hoverring button to images

const img=document.querySelectorAll(".box");
img.forEach(image => {
    const buttonsList = document.createElement("div");
    buttonsList.style.display = "flex"; // To arrange the buttons horizontally

    const addbtn = document.createElement("button");
    const imgbtn = document.createElement("button");
    addbtn.setAttribute("class", "addbtn");
    imgbtn.setAttribute("class", "addbtn");

    addbtn.innerText = "Add To collection";
    imgbtn.innerText = "Open image";

    // Add transition styles to the buttons
    addbtn.style.transition = "opacity 1s ease-in-out, box-shadow 1s ease-in-out";
    imgbtn.style.transition = "opacity 1s ease-in-out, box-shadow 1s ease-in-out";

    buttonsList.appendChild(addbtn);
    buttonsList.appendChild(imgbtn);

    image.addEventListener('mouseenter', () => {
        image.appendChild(buttonsList);
    });

    image.addEventListener('mouseleave', () => {
        image.removeChild(buttonsList);
    });

    addbtn.addEventListener("click", () => {
        console.log("clicked");
    });

    imgbtn.addEventListener("click", () => {
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
