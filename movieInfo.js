const jsonInfo=localStorage.getItem("movie_Info")
const Info=JSON.parse(jsonInfo);
const imageURL = "https://image.tmdb.org/t/p/w500";

//DOC elements
const poster=document.querySelector(".Poster")
const title=document.querySelector(".title");
const story=document.querySelector(".story");
const ratings=document.querySelector(".ratings")
const year=document.querySelector(".year");
const writeReview=document.querySelector(".new-review");

window.addEventListener("load",()=>{
    let str=Info.Release_date;
    title.innerHTML=Info.Title;
    year.innerHTML="Year: "+str.substring(0,4);
    story.innerHTML+=Info.Story;
  
    ratings.innerHTML="Ratings:"+Info.Ratings;
    poster.src=imageURL+Info.Poster_Path;
   
})

console.log(Info.Title);