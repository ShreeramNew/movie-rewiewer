const jsonInfo = localStorage.getItem("movie_Info")
const Info = JSON.parse(jsonInfo);
const imageURL = "https://image.tmdb.org/t/p/w500";
const API_Key = "AIzaSyCzjxWaxgF0a8fXNWaxsRpDWBVlhMNW7pA";

//Selectors
const poster = document.querySelector(".Poster")
const title = document.querySelector(".title");
const story = document.querySelector(".story");
const ratings = document.querySelector(".ratings")
const year = document.querySelector(".year");
let newReview_TextBox = document.getElementById("review-text");
let buttonsContainer = document.createElement("div");
buttonsContainer.className = "save-cancel-container";
let like_button = document.querySelector(".like-button");
let trailer_link=document.querySelector("#watch-trailer-link");
buttonsContainer.innerHTML =
    `
<button class="cancel">Cancel</button>
        <button class="save">Save</button>
`;
let reviewContainer = document.querySelector(".write-review-container")

//Other
let like_count = 22;

window.addEventListener("load", () => {
    let str = Info.Release_date;
    title.innerHTML = Info.Title;
    year.innerHTML = "Year: " + str.substring(0, 4);
    story.innerHTML += Info.Story;

    ratings.innerHTML = "Ratings:" + Info.Ratings;
    poster.src = imageURL + Info.Poster_Path;


    like_button.addEventListener("click", () => {
        let like_count_holder = document.querySelector(".like-count");
        like_count_holder.innerHTML = like_count++;
    })
    BuildWatchTrailer(Info.Title);
})
//commit checkling
newReview_TextBox.addEventListener("input", () => {
    newReview_TextBox.style.height = newReview_TextBox.scrollHeight + "px";
    reviewContainer.appendChild(buttonsContainer);
    let cancel = document.querySelector(".cancel");
    cancel.addEventListener("click", () => {
        newReview_TextBox.value = "";
        newReview_TextBox.style.height = "40px";
        try {
            reviewContainer.removeChild(buttonsContainer)
        } catch (error) {
            console.log(error);
        }

    })
    let save = document.querySelector(".save");
    save.addEventListener("click", () => {
        let reviewText = newReview_TextBox.value;

    })


});
async function BuildWatchTrailer(movie_title) {
    console.log("this"+title);
    const link_to_fetch_videoId = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + movie_title +"Trailer"+ "&key=" + API_Key;
    const result = await (await fetch(link_to_fetch_videoId)).json()
    const videoId=result.items[0].id.videoId;
    const videoLink="https://www.youtube.com/watch?v="+videoId;
    trailer_link.href=videoLink;


}

console.log(Info.Title);