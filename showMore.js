// Constants
const api_key = "5e186d5ec9a8d492e2da546a55997aea";
const imageURL = "https://image.tmdb.org/t/p/w500";

//Get from Local_storage
const Incoming_JSON = localStorage.getItem("Genre_info");
const parsed_JSON = JSON.parse(Incoming_JSON);
const genreName = parsed_JSON.Genre_name;
const recieved_fetch_link = parsed_JSON.fetch_link;

//checking
// console.log(genreName,recieved_fetch_link);
// console.log(typeof(recieved_fetch_link));
// let pageNo=20;
// let string="Hello page=1";
// console.log(string.replace("page=1","page="+pageNo));

//References
let nonNavBody = document.querySelector(".nonNav");

//other
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
let pageNo = 0;

window.addEventListener("load", async () => {
    let genreDiv = document.createElement('div');
    genreDiv.className = "genre-container";
    let genreTitle = document.createElement('h3');
    genreTitle.className = "genre"
    genreTitle.innerHTML = genreName;
    genreDiv.appendChild(genreTitle);
    nonNavBody.appendChild(genreDiv);

    // Build Genre movie-poster section
    let posterDiv = document.createElement('div');
    posterDiv.className = "poster-container-of-showMore-page";
    nonNavBody.appendChild(posterDiv)
    for (let i = 2; i < 10; i++) {
        pageNo++;
        let final_fetch_link = recieved_fetch_link.replace("page=" + 1, "page=" + pageNo);
        console.log(final_fetch_link);
        try {
            const fetchResultInJson = await (await fetch(final_fetch_link)).json();
            const movieResultArray = fetchResultInJson.results;
            movieResultArray.forEach(movie => {
                index++;
                // Fetching Each movies-info
                imagePath[index] = movie.poster_path;
                title[index] = movie.title;
                releaseDate[index] = movie.release_date;
                story[index] = movie.overview;
                ratings[index] = movie.vote_average;

                // Displaying Each movie-poster
                let linkTag = document.createElement("a");
                linkTag.href = "movieInfo.html";
                let imgTag = document.createElement("img");
                imgTag.className = "poster " + index;
                imgTag.src = imageURL + imagePath[index];
                linkTag.appendChild(imgTag);
                posterDiv.appendChild(linkTag);
                imgTag.addEventListener("click", () => {
                    classListArray = imgTag.classList;
                    imageClickHandler(classListArray[1]);
                })
            })
        } catch (error) {
            console.log("This is error" + error);
        }

        //Normal
    }
})
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