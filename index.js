// Constants
const api_key = "5e186d5ec9a8d492e2da546a55997aea";
const imageURL = "https://image.tmdb.org/t/p/w500";
let genreId;

// Links
let movieAccordingToGenreId = "";
let genreIdListLink = "https://api.themoviedb.org/3/genre/movie/list?api_key=" + api_key + "&language=en-US";
let popularMovieLink = "https://api.themoviedb.org/3/movie/popular?api_key=" + api_key + "&language=en-US&page=1";
let popularTVLink = "https://api.themoviedb.org/3/tv/popular?api_key=" + api_key + "&language=en-US&page=1"
// References
let nonNavBody = document.querySelector(".nonNav");
let select = document.querySelector("#genre-options");
let fetchNowlink = "";

// Declarations
let sectionName = undefined;
let index = -1;
let showMore_Index = -1;
let genre_Index = -1
let sectionNameArray = [];
let classList_of_clickked_image = [];
let releaseDate = [];
let story = []
let ratings = [];
let title = [];
let tryPath = [];
let poster = [];
let imagePath = [];
let jsonResultOfPopular = [];
let fetchNowlinkArray = [];
let Index_of_selected_genre=0;




//On Load
window.addEventListener("load", async () => {
    BuildMoviesSections("Popular_Movies")
    // BuildMoviesSections("Popular_TV")
    const genreIdResult = await (await fetch(genreIdListLink)).json();
    let genreList = genreIdResult.genres;
    console.log(genreList)
    if (genreList.length) {
        genreList.forEach(genre => {
            BuildMoviesSections(genre);
        });
    }
})
//script for auto slider starts
  //Declarations
  let counter = 0;
  let timeDelay = 2000;
  let auto_slider;

  //Selectors
  let position_representer = document.querySelectorAll(".position-representer");
  let image_container = document.querySelector(".slide-image-container ")

  startAuto_slide();

  function startAuto_slide() {
      auto_slider = setInterval(() => {
          counter++;
          if (counter == 4) {
              counter = 1;
          }
          console.log(timeDelay);
          switch (counter + "") {
              case "1": image_container.style.marginLeft = "0%";
                  change_backgroundColor(position_representer[0])
                  changeStyleOf_Others(1)
                  break;
              case "2": image_container.style.marginLeft = "-100%";
                  change_backgroundColor(position_representer[1])
                  changeStyleOf_Others(2)
                  break;
              case "3": image_container.style.marginLeft = "-200%";
                  change_backgroundColor(position_representer[2])
                  changeStyleOf_Others(3)
                  break;
          }
      }, timeDelay);
  }

  function stopAuto_slider() {
      clearInterval(auto_slider)
  }

 
  position_representer.forEach((representer) => {
      representer.addEventListener("click", (event) => {
          stopAuto_slider();
          let className = event.currentTarget.classList;
          change_backgroundColor(event.currentTarget)
          changeStyleOf_Others(className[1]);
          switch (className[1]) {
              case "1": image_container.style.marginLeft = "0%";
                  break;
              case "2": image_container.style.marginLeft = "-100%";
                  break;
              case "3": image_container.style.marginLeft = "-200%";
                  break;
          }
          setTimeout(() => {
              startAuto_slide();
          }, 5000);
      })
  })

  function changeStyleOf_Others(clicked_index) {
      position_representer.forEach((representer) => {
          if (representer.classList.contains(clicked_index)) {
              return;
          }
          else {
              representer.style.backgroundColor = "black";
          }
      })
  }

  function change_backgroundColor(element) {
      element.style.backgroundColor = "white";
  }
  //script for auto slider ends

async function BuildMoviesSections(genre) {
    if (genre.id === 99 || genre.id === 10749 || genre.id === 10752) {
        return
    }
    else if (genre == "Popular_Movies") {
        fetchNowlink = popularMovieLink;
        sectionName = "Popular Movies";
    }
    else {
        movieAccordingToGenreId = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=" + genre.id;
        fetchNowlink = movieAccordingToGenreId;
        sectionName = genre.name;

    }

    // Build Genre Title Section
    genre_Index++;
    let genreDiv = document.createElement('div');
    genreDiv.className = "genre-container";
    let genreTitle = document.createElement('h3');
    genreTitle.className = "genre " + genre_Index;
    genreTitle.innerHTML = sectionName;
    genreDiv.appendChild(genreTitle);
    nonNavBody.appendChild(genreDiv);

    //Saving the section name and fetchNowLink

    sectionNameArray[genre_Index] = sectionName;
    fetchNowlinkArray[genre_Index] = fetchNowlink;

    //Adding options for the drop down list in nav bar
    
    let option = document.createElement("option");
    option.innerHTML=sectionName;
    select.appendChild(option);
    select.addEventListener("change",() => {
        Index_of_selected_genre=select.selectedIndex-1;
        let genreInfo = {
            "fetch_link":fetchNowlinkArray[Index_of_selected_genre],
            "Genre_name":sectionNameArray[Index_of_selected_genre]
        }
        localStorage.setItem("Genre_info", JSON.stringify(genreInfo));
        console.log(Index_of_selected_genre);
     })
    
    // Build Genre movie-poster section
    let posterDiv = document.createElement('div');
    posterDiv.className = "poster-container";
    nonNavBody.appendChild(posterDiv)
    try {
        const fetchResultInJson = await (await fetch(fetchNowlink)).json();
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
            console.log(sectionName);

            imgTag.addEventListener("click", (event) => {
                classList_of_clickked_image = event.currentTarget.classList;
                imageClickHandler(classList_of_clickked_image[1]);

            })
        })
        showMore_Index++;
        let showMoreLink = document.createElement("a");
        showMoreLink.href = "showMore.html";
        showMoreLink.classList = "showMoreLink " + fetchNowlinkArray[showMore_Index] + " " + sectionNameArray[showMore_Index] + " " + showMore_Index;
        showMoreLink.style.color = "white";
        showMoreLink.innerHTML = "Show more";
        posterDiv.appendChild(showMoreLink);
        console.log("Link of" + showMore_Index + "is Added");
        console.log("This is section array" + sectionNameArray);
        showMoreLink.addEventListener("click", (event) => {
            let classList_of_clickked_showMore = event.currentTarget.classList;
            // alert("Class List:" + classList_of_clickked_showMore)
            let genreInfo = {
                "fetch_link": classList_of_clickked_showMore[1],
                "Genre_name": classList_of_clickked_showMore[2]
            }
            localStorage.setItem("Genre_info", JSON.stringify(genreInfo));
        })
    } catch (error) {
        console.log("This is error" + error);
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