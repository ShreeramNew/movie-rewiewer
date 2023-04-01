var api_key = "5e186d5ec9a8d492e2da546a55997aea";
var div = document.querySelector(".poster-container")
var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
var api_key = "5e186d5ec9a8d492e2da546a55997aea";
var div = document.querySelector(".poster-container")
// let poster=[];
// div.innerHTML += `
// <img src="" alt="new" class="poster">
// `
var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
console.log("Fetching");
var imageURL = "https://image.tmdb.org/t/p/w500"
var imagePath = []
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
                div.innerHTML += `
                    <img src="" alt="new" class="poster">
                `
                var poster = document.querySelectorAll(".poster")
                poster[i].src = imageURL + imagePath[i];
              
            }
           
        })
   
})