var api_key = "5e186d5ec9a8d492e2da546a55997aea";
var div = document.querySelector(".poster-container")
var movielink = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
var movielinkCheck = "https://api.themoviedb.org/3/movie/28?api_key=" + api_key + "&language=en-US&page=1";
var genreLink="https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US";
var div = document.querySelector(".poster-container")
let poster=[];
var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
console.log("Fetching");
var imageURL = "https://image.tmdb.org/t/p/w500"
var imagePath = [];
window.addEventListener("load", () => {
    console.log("Fetching");
    fetch(movielinkCheck)
    .then((response)=>response.json())
    .then((genrejson)=>{
        console.log("This is genre:",genrejson);
    })
    fetch(link)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            for (i = 0; i < 15; i++) {
                imagePath[i] = json.results[i].poster_path;
            }
            for (i = 0; i < 14; i++) {
                var imgTag=document.createElement("img");
                imgTag.className="poster";
                imgTag.src= imageURL + imagePath[i];
                div.appendChild(imgTag);
                imgTag.addEventListener("click",()=>{
                    console.log("I am Image")
                }) 
            }
           
        })
   
})