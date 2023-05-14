const jsonInfo=localStorage.getItem("movie_Info")
const Info=JSON.parse(jsonInfo);
const imageURL = "https://image.tmdb.org/t/p/w500";

//DOC elements
const poster=document.querySelector(".Poster")
const title=document.querySelector(".title");
const story=document.querySelector(".story");
const ratings=document.querySelector(".ratings")
const year=document.querySelector(".year");
let newReview_TextBox=document.getElementById("review-text");
let buttonsContainer=document.createElement("div");
buttonsContainer.className="save-cancel-container";

buttonsContainer.innerHTML=
`
<button class="cancel">Cancel</button>
        <button class="save">Save</button>
`;
let cancel,save;
let reviewContainer=document.querySelector(".write-review-container")

window.addEventListener("load",()=>{
    let str=Info.Release_date;
    title.innerHTML=Info.Title;
    year.innerHTML="Year: "+str.substring(0,4);
    story.innerHTML+=Info.Story;
  
    ratings.innerHTML="Ratings:"+Info.Ratings;
    poster.src=imageURL+Info.Poster_Path;
   
})
//commit checkling
newReview_TextBox.addEventListener("input",()=>{
    newReview_TextBox.style.height=newReview_TextBox.scrollHeight+"px";
    reviewContainer.appendChild(buttonsContainer);
    cancel=document.querySelector(".cancel");
    cancel.addEventListener("click",()=>{
        newReview_TextBox.value="";
        newReview_TextBox.style.height="40px";
        try {
            reviewContainer.removeChild(buttonsContainer)
        } catch (error) {
            console.log(error);
        }
        
    })
    save=document.querySelector(".save");
    save.addEventListener("click",()=>{
       let reviewText=newReview_TextBox.value;
       
    })
    

});


console.log(Info.Title);