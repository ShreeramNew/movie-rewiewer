var api_key = "5e186d5ec9a8d492e2da546a55997aea";
var div = document.querySelector(".poster-container")
let poster=[];
var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
console.log("Fetching");
var imageURL = "https://image.tmdb.org/t/p/w500"
var imagePath = [];
var image=document.querySelector(".image");
var but= document.querySelectorAll(".but")

window.addEventListener("load", () => {
    console.log("Fetching");
    fetch(link)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            for (i = 0; i < 15; i++) {
                imagePath[i] = json.results[i].poster_path;
            }
            for (i = 0; i < 10; i++) {
                console.log("This is:" + imagePath[i])
            }

            console.log(imagePath);
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