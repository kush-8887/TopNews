console.log('Demo Log');

// API KEYS
const newsApiKey = "266a47e8365c4cdca90fe238e03f6af0";

let container = document.getElementById('container');
let country = "in";
container.innerHTML = '';

function getNews(){
    url = `https://newsapi.org/v2/top-headlines?category=sports&country=${country}&apiKey=${newsApiKey}`;
    fetch(url).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log(data);
        data.articles.forEach(article=>{
            container.innerHTML += 
            `<div>
            <img style ="height:50px; width:50px;" src="${article.urlToImage}"</img>
            <a href="${article.url}" target="_blank">${article.title}</a>
            </div>`
        })
    })
}
// function articlesView(){
//     document.getElementsByClassName('container').innerText = articles[1];
// }

// User Location 
// window.navigator.geolocation
//   .getCurrentPosition(console.log, console.log);

getNews();
// articlesView();