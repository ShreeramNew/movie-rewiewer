// Constants
const api_key = "5e186d5ec9a8d492e2da546a55997aea";
const imageURL = "https://image.tmdb.org/t/p/w500";
let genreId;

// links
let movieAccordingToGenreId = "https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres="+genreId;
let genreIdList="https://api.themoviedb.org/3/genre/movie/list?api_key="+api_key+"&language=en-US";

var link = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
// References
let nonNavBody=document.querySelector(".nonNav");
let genreContainer = document.querySelector(".poster-container")
let posterContainer = document.querySelector(".poster-container")

// Other
let poster=[];
var imagePath = [];

window.addEventListener("load", () => {
    fetch(genreIdList)
    .then((response)=>response.json())
    .then((genrejson)=>{
       let genreList=genrejson.genres;
        if(genreList.length){
             genreList.forEach(genre=> {
                BuildMoviesSections(genre)
             });  
        }
    })


    console.log("Fetching");
    
    fetch(link)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            for (i = 0; i < 15; i++) {
                imagePath[i] = json.results[i].poster_path;
                let imgTag=document.createElement("img");
                imgTag.className="poster";
                imgTag.src= imageURL + imagePath[i];
                posterContainer.appendChild(imgTag);
                imgTag.addEventListener("click",()=>{
                    console.log("I am Image")
                }) 
            }
           
        })
   
})

function BuildMoviesSections(genre){
    // Build Genre Title Section
    let genreDiv=document.createElement('div');
    genreDiv.className="genre-container";
    let genreTitle=document.createElement('h3');
    genreTitle.className="genre"
    genreTitle.innerHTML=genre.name;
    genreDiv.appendChild(genreTitle);
    let showMoreButton=document.createElement('button');
    showMoreButton.className="show-more";
    showMoreButton.innerHTML="Show more>";
    genreDiv.appendChild(showMoreButton);
    nonNavBody.appendChild(genreDiv);

    // Build Genre movie-poster section
    let posterDiv=document.createElement('div');
    posterDiv.className="poster-container";
    genreId=genre.id;
    console.log(genre.id);
    fetch(movieAccordingToGenreId)
    .then((response) => response.json())
    .then((json) => {
        console.log(json)
        for (i = 0; i < 14; i++) {
            let resultArray=json.results;
            console.log("This is Result Arry",resultArray);
            // Fetching Each movie-poster-path
            imagePath= json.results[i].poster_path;
            
            // Displaying Each movie-poster
            let imgTag=document.createElement("img");
            imgTag.className="poster";
            imgTag.src= imageURL + imagePath[i];
            posterDiv.appendChild(imgTag);
            imgTag.addEventListener("click",()=>{
                        console.log("I am Image")
            }) 
        }
    })
    nonNavBody.appendChild(posterDiv)


}