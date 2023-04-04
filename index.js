// Constants
const api_key = "5e186d5ec9a8d492e2da546a55997aea";
const imageURL = "https://image.tmdb.org/t/p/w500";
let genreId;

// Links
let movieAccordingToGenreId = "";
let genreIdList = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key + "&language=en-US";
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
window.addEventListener("load", () => {
    BuildMoviesSections("Popular")
    //This fetches movie according to Genre
    fetch(genreIdList)
        .then((response) => response.json())
        .then((genrejson) => {
            let genreList = genrejson.genres;
            if (genreList.length) {
                genreList.forEach(genre => {
                    BuildMoviesSections(genre)
                });
            }
        })

})

function BuildMoviesSections(genre) {
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

    // Build Genre movie-poster section
    let posterDiv = document.createElement('div');
    posterDiv.className = "poster-container";
    fetch(fetchNowlink)
        .then((response) => response.json())
        .then((json) => {
            for (i = 0; i < 14; i++) {
                index++;
                // Fetching Each movies-info
                console.log(json)
                imagePath[index] = json.results[i].poster_path;
                title[index] = json.results[i].title;
                releaseDate[index] = json.results[i].release_date;
                story[index] = json.results[i].overview;
                ratings[index] = json.results[i].vote_average;

                // Displaying Each movie-poster
                let imgTag = document.createElement("img");
                imgTag.className = "poster " + index;
                classListArray = imgTag.classList;
                imgTag.src = imageURL + imagePath[classListArray[1]];
                posterDiv.appendChild(imgTag);

                imgTag.addEventListener("click", () => {
                    classListArray = imgTag.classList;
                    title[classListArray[1]];
                    imageClickHandler(classListArray[1]);

                })
            }
            let showMore = document.createElement('button');
            showMore.className = "show-more";
            showMore.style.color = "white";
            showMore.innerHTML = "Show more";
            showMore.addEventListener("click", () => {
                console.log("Clicked button");
            })
            posterDiv.appendChild(showMore);

        })
    nonNavBody.appendChild(posterDiv)
}
function imageClickHandler(imageIndex) {
    let movieInfo={
        "Title":title[imageIndex],
        "Story":story[imageIndex],
        "Release_date":releaseDate[imageIndex],
        "Ratings":ratings[imageIndex],
        "Poster_Path":imagePath[imageIndex]
    }
    localStorage.setItem("movie_Info",JSON.stringify(movieInfo));
    location.replace("movie.html");
}