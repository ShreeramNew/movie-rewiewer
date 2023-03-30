var api_key = "5e186d5ec9a8d492e2da546a55997aea";
var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
console.log("Fetching");
var imageURL = "https://image.tmdb.org/t/p/w500"
var imagePath = "null"
var poster = document.querySelectorAll(".poster")
window.addEventListener("load", () => {
    console.log("Fetching");
    fetch(link)
        .then((response) => response.json())
        .then((json) => {
            imagePath = json.results[0].poster_path
            console.log(imagePath);
            for (i = 0; i < poster.length; i++) {
                poster[i].src = imageURL + imagePath;
            }

        })
})
