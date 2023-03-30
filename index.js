var api_key="5e186d5ec9a8d492e2da546a55997aea";
var link="https://api.themoviedb.org/3/movie/popular?api_key="+api_key+"&language=en-US&page=1";
console.log("Fetching");
window.addEventListener("load",()=>{
    console.log("Fetching");
    fetch(link)
    .then((response)=>response.json())
    .then((json)=>{
        console.table(json)
    })
})
  