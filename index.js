// Constants
const api_key = "5e186d5ec9a8d492e2da546a55997aea";
const imageURL = "https://image.tmdb.org/t/p/w500";
let genreId;

// Links
let movieAccordingToGenreId = "";
let genreIdListLink = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key + "&language=en-US";
var popularMovieLink = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
// References
let nonNavBody = document.querySelector(".nonNav");
let genreContainer = document.querySelector(".poster-container")
let posterContainer = document.querySelector(".poster-container")
let fetchNowlink = "";

// Other
let sectionName = undefined;
let index = -1;
let classListArray = [];
let releaseDate = [];
let story = []
let ratings = [];
let title = [];
let tryPath = [];
let poster = [];
var imagePath = [];
let jsonResultOfPopular = []

//On Load
window.addEventListener("load",async () => {
    BuildMoviesSections("Popular")
    const genreIdResult=await (await fetch(genreIdListLink)).json();
    let genreList = genreIdResult.genres;
    if (genreList.length) {
        genreList.forEach(genre => {
            BuildMoviesSections(genre);
        });
    }
})

async function BuildMoviesSections(genre) {
    if (genre.id == 99 || genre.id == 10749) {
        return
    }
    else if (genre == "Popular") {
        fetchNowlink = popularMovieLink;
        sectionName = "Popular Movies";
    }
    else {
        movieAccordingToGenreId = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=" + genre.id;
        fetchNowlink = movieAccordingToGenreId;
        sectionName = genre.name;
    }

    // Build Genre Title Section
    let genreDiv = document.createElement('div');
    genreDiv.className = "genre-container";
    let genreTitle = document.createElement('h3');
    genreTitle.className = "genre"
    genreTitle.innerHTML = sectionName;
    genreDiv.appendChild(genreTitle);
    nonNavBody.appendChild(genreDiv);
    console.log(sectionName)

    // Build Genre movie-poster section
    let posterDiv = document.createElement('div');
    posterDiv.className = "poster-container";
    nonNavBody.appendChild(posterDiv)
    try {
        const fetchResultInJson=await (await fetch(fetchNowlink)).json();
        const movieResultArray=fetchResultInJson.results;
        movieResultArray.forEach(movie=>{ index++;
            // Fetching Each movies-info
            console.log(fetchResultInJson)
            imagePath[index] = movie.poster_path;
            title[index] = movie.title;
            releaseDate[index] = movie.release_date;
            story[index] = movie.overview;
            ratings[index] = movie.vote_average;

            // Displaying Each movie-poster
            let linkTag=document.createElement("a");
            linkTag.href="movieInfo.html";
            let imgTag = document.createElement("img");
            imgTag.className = "poster " + index;
            classListArray = imgTag.classList;
            imgTag.src = imageURL + imagePath[classListArray[1]];
            linkTag.appendChild(imgTag);
            posterDiv.appendChild(linkTag);

            imgTag.addEventListener("click", () => {
                classListArray = imgTag.classList;
                title[classListArray[1]];
                imageClickHandler(classListArray[1]);

            })})
        let showMore = document.createElement('button');
        showMore.className = "show-more";
        showMore.style.color = "white";
        showMore.innerHTML = "Show more";
        showMore.addEventListener("click", () => {
            console.log("Clicked button");
        })
        posterDiv.appendChild(showMore);
        console.log("Post Added");
    } catch (error) {
        console.log("This is error"+error);
    }

    //Normal
   

}
function imageClickHandler(imageIndex) {
    let movieInfo = {
        "Title": title[imageIndex],
        "Story": story[imageIndex],
        "Release_date": releaseDate[imageIndex],
        "Ratings": ratings[imageIndex],
        "Poster_Path": imagePath[imageIndex]
    }
    localStorage.setItem("movie_Info", JSON.stringify(movieInfo));
}