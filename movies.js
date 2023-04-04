const jsonInfo=localStorage.getItem("movie_Info")
const Info=JSON.parse(jsonInfo);
const imageURL = "https://image.tmdb.org/t/p/w500";

console.log(Info.Title);