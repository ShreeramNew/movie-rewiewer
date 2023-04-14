const jsonInfo=localStorage.getItem("movie_Info")
const Info=JSON.parse(jsonInfo);
const imageURL = "https://image.tmdb.org/t/p/w500";

//DOC elements
const poster=document.querySelector(".Poster")
const title=document.querySelector(".title");
const story=document.querySelector(".story");
const ratings=document.querySelector(".ratings")
const year=document.querySelector(".year");
let text=document.getElementById("review-text");
let buttonsContainer=document.createElement("div");
buttonsContainer.className="save-cancel-container";

buttonsContainer.innerHTML=
`
<button class="cancel">Cancel</button>
        <button class="save">Save</button>
`;
let cancel;
let reviewContainer=document.querySelector(".write-review-container")

window.addEventListener("load",()=>{
    let str=Info.Release_date;
    title.innerHTML=Info.Title;
    year.innerHTML="Year: "+str.substring(0,4);
    story.innerHTML+=Info.Story;
  
    ratings.innerHTML="Ratings:"+Info.Ratings;
    poster.src=imageURL+Info.Poster_Path;
   
})
text.addEventListener("input",()=>{
    text.style.height=text.scrollHeight+"px";
    reviewContainer.appendChild(buttonsContainer);
    cancel=document.querySelector(".cancel");
    cancel.addEventListener("click",()=>{
        text.value="";
        text.style.height="40px";
        try {
            reviewContainer.removeChild(buttonsContainer)
        } catch (error) {
            console.log(error);
        }
        
    })
    

});


console.log(Info.Title);